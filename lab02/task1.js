/*
    1. Подключите модуль 'http'
    2. Создайте объект server, используя конструктор createServer
    3. Поставьте сервер на прослушку какого-либо порта, например 9000
    4. Установите для объекта server событие request
    5. Опишите для события request функцию обратного вызова, которая принимает 
       в качестве аргумента параметры request и response. Она должна:
        - Послать клиенту код http-статуса 200
        - Послать клиенту сообщение 'Hello from Node.js от [ФИО]'
    6. Не забудьте явно завершить ответ клиенту
    7. Сохраните файл и запустите сервер через консоль
    8. Выполните запрос к серверу через браузер и убедитесь в корректности ответа
    9. Остановите сервер
*/
const http = require("node:http")

const server = http.createServer()

server.on("request", function (request, response) {
    response.statusCode = 200
    response.write("Hello from Dmitriy Naumov, brought to you by Node.js")
    response.end()
})

server.listen(9000)
