/*
    1. Откройте документацию Node.js (http://nodejs.org/api/http.html
       #http_response_writehead_statuscode_reasonphrase_headers) 
       и посмотрите, как послать дополнительные заголовки ответа сервера.

    2. Измените код сервера, чтобы он отдавал заголовок, необходимый 
       для "понимания" браузером, что он получает html-код.

    3. Перезапустите сервер.

    4. Выполните запрос к серверу через браузер и убедитесь в корректности 
       ответа.
*/

const http = require("node:http")
const fs = require("node:fs/promises")

function defaultHandler (request, response) {
    response.statusCode = 200
    response.setHeader("Content-type", "text/html; encoding=utf-8")
    response.write("Hello from Dmitriy!\n")
    fs.readFile("./index.html", "utf-8")
    .then(data => {
        response.write(data)
        response.end()
    })
}

const server = http.createServer(defaultHandler)

server.listen(8080)
