const http = require("node:http")
const getFile = require("getfile")
const logger = require("logger")

logger.log("hello world")
logger.warn("warning example")
logger.error("error example")


let server = http.createServer()

server.on("listening", () => logger.warn("Listening port "+server.address().port))

server.on("request", (request, response) => {
    let url = (request.url == "/" ? "/index.html" : request.url)
    let localPath = "./www" + url
    logger.log(`${request.method} ${request.url}`)
    if (request.method != "GET") {
        logger.error(`${request.method} - not allowed`)
        response.statusCode = 405
        response.setHeader("Content-type", "text/plain")
        response.end("405 Method not allowed")
    }

    getFile(localPath).then((localFile) => {
        localFile.pipeAsync(response).then(()=> response.end())
    })
    .catch(() => {
        logger.error(`${request.url} - not found`)
        response.statusCode = 404
        response.setHeader("Content-type", "text/plain")
        response.end("404 not found")
    })
})

server.listen(8080)
