/*
    1. Подключите модуль 'http'

    2. Создайте сервер с ф-цией обратного вызова, которая принимает два аргумента: 
       request и response. Поставьте сервер на прослушку порта 8080

    3. С помощью объекта response:
        - верните статус успешного выполнения запроса
        - в теле ответа верните строку "Привет от [ваше имя]!"
        - сообщите клиенту, что все необходимые данные переданы (обозначьте конец ответа)

    4. Запустите сервер

    5. Выполните запрос к серверу через браузер и убедитесь в корректности ответа

    6. Остановите сервер.
*/

const http = require("node:http")

function defaultHandler (request, response) {
    response.statusCode = 200
    response.write("Hello from Dmitriy!!!!")
    response.end()
}

const server = http.createServer(defaultHandler)

server.listen(8080)
