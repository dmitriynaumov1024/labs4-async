/*
    1. Создайте в папке labs файл index.html со следующим содержимым:
    <hr><strong>Конец сообщения.</strong>

    2. В текущем файле (lab-1.js) подключите модуль 'fs'

    3. Асинхорнно зачитайте файл index.html и верните его клиенту после 
       вывода строки "Привет от [ваше имя]!"

    4. Запустите сервер

    5. Выполните запрос к серверу через браузер и убедитесь в корректности 
       ответа. Если вы всё сделали правильно, то должна остаться одна 
       проблема: html-код из файла вывелся "как есть". Почему? 

    6. Изучите заголовки ответа сервера
*/

const http = require("node:http")
const fs = require("node:fs/promises")

function defaultHandler (request, response) {
    response.statusCode = 200
    response.write("Hello from Dmitriy!\n")
    fs.readFile("./index.html", "utf-8")
    .then(data => {
        response.write(data)
        response.end()
    })
}

const server = http.createServer(defaultHandler)

server.listen(8080)
