/*
    1. Опишите для события listening объекта server функцию обратного вызова, которая выводит в консоль строку 'Listening port [номер порта]...'
    2. Опишите для события connection объекта server функцию обратного вызова, которая выводит в консоль строку 'Connecting...'
    3. Опишите для события request объекта server ещё одну ф-цию обратного вызова, которая выводит в консоль:
        - Метода запроса
        - URL запроса
        - Код статуса ответа
    4. Сохраните файл и запустите сервер через консоль
    5. Выполните запрос к серверу через браузер и убедитесь в корректности ответа
    6. Проанализируйте вывод в консоль ответов сервера
    7. Остановите сервер
*/

const http = require("node:http")

const server = http.createServer()

server.on("listening", function () {
    console.log(`Listening port ${server.address().port}`)
})

server.on("connection", function () {
    console.log("Connecting")
})

server.on("request", function (request, response) {
    response.statusCode = 200
    response.write("Hello from Dmitriy Naumov, brought to you by Node.js")
    response.end()
})

server.on("request", function (request, response) {
    console.log(`[${new Date().toLocaleString("se")}] ${request.method} ${request.path??'/'} ${response.statusCode}`)
})

server.listen(9000)
