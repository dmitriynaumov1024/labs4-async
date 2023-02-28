const { EventEmitter } = require("node:events")
const http = require("node:http")
const express = require("express")
const path = require("node:path")
const socketio = require("socket.io")

let room = new EventEmitter()
let serverName = "[server]"

let app = express()
let server = http.createServer(app)
let io = socketio(server)

app.use(express.static(path.resolve("./public")))

app.set("view engine", "pug")
app.set("views", path.resolve("./pug_templates"))
app.get("/", (request, response) => {
    response.render("index")
})

io.on("connection", (socket) => {
    let _username = ""
    socket.on("join", (username, callback) => {
        if (username == serverName) callback(false)
        _username = username
        room.emit("message", {
            sender: serverName,
            time: new Date().toLocaleString("se"), 
            text: username + " joined the chat!"
        })
        callback(true)
    })
    socket.on("send", (text) => {
        if (!_username) return
        room.emit("message", {
            sender: _username,
            time: new Date().toLocaleString("se"),
            text: text
        })
    })
    room.on("message", message => {
        socket.emit("message", message)
    })
})

module.exports = {
    start() {
        let port = 8080
        console.log("App listening "+port)
        server.listen(port)
    }
}
