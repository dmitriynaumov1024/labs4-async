/*
    1. Создайте HTTP-сервер, который будет отдавать по запросу картинку logo.gif, 
       используя метод потока для чтения pipe
    2. Сохраните файл и запустите сервер через консоль 
    3. Запросите сервер через браузер и убедитесь в корректной работе кода 
*/

const fs = require("node:fs")
const http = require("node:http")

// let stream = fs.createReadStream("./index.html")
// stream.pipe(process.stdout)
// stream.on("close", () => {
//     process.stdout.write("\n")
// })

let server = http.createServer()

server.on("request", (request, response) => {
    if (request.url == "/logo.gif") {
        response.statusCode = 200
        response.setHeader("Content-type", "image/gif")
        let logoReadStream = fs.createReadStream("./logo.gif")
        logoReadStream.pipe(response)
        logoReadStream.on("close", () => {
            response.end()
        })
    }
    else {
        response.statusCode = 404
        response.setHeader("Content-type", "text/plain")
        response.end("404 Not found")
    }
})

server.on("listening", () => {
    console.log(`Listening port ${server.address().port}`)
})

server.listen(8080)
