/*
    1. Измените функцию обратного вызова события request объекта server добавив условие:
        - если URL запроса является строкой вида '/stop', то необходимо остановить сервер
    2. Опишите для события close объекта server функцию обратного вызова, которая выводит в консоль строку 'The end.'
    3. Сохраните файл и запустите сервер через консоль
    4. Выполните запрос к корню сервера через браузер и убедитесь в корректности ответа
    5. Выполните запрос к серверу через браузер используя адрес '/stop' (например, localhost:9000/stop)
    6. Дождитесь прекращения работы сервера. Это может занять некоторое время
*/

const http = require("node:http")

const server = http.createServer()

server.keepAliveTimeout = 100

server.on("listening", function () {
    console.log(`Listening port ${server.address().port}`)
})

server.on("close", function () {
    console.log("The end")
})

server.on("connection", function () {
    console.log("Connecting")
})

server.on("request", function (request, response) {
    response.statusCode = 200
    response.write("Hello from Dmitriy Naumov, brought to you by Node.js")
    response.end()
    console.log(request.url)
    if (request.url=="/stop") server.close()
})

server.on("request", function (request, response) {
    console.log(`[${new Date().toLocaleString("se")}] ${request.method} ${request.url} ${response.statusCode}`)
})

server.listen(9000)
