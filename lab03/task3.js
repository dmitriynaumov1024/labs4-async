/*
    Установите для объекта logger событие getUsers
    Опишите для события getUsers функцию обратного вызова. Она должна:
    - выводить в консоль строку 'Logged users: [содержимое элементов массива 
    users разделённых произвольным символом]'
    Установите для объекта logger событие getMsgs
    Опишите для события getMsgs функцию обратного вызова. Она должна:
    - выводить в консоль строку 'Messages: [содержимое элементов массива msgs 
    разделённых произвольным символом]'
    Добавьте вызовы метода emit объекта logger для обоих событий в конец кода
    Сохраните файл, запустите его в консоли и убедитесь в корректной работе кода
*/

const { EventEmitter } = require("node:events")

const logger = new EventEmitter()

let users = []
let messages = []

logger.on("message", function(message) {
    messages.push(message)
    console.log("New message: " + message)
})

logger.on("login", function(name) {
    users.push(name)
    console.log("New user: " + name)
})

logger.on("getUsers", function() {
    console.log("\u001b[01;10mUsers: \u001b[00m\n " + users.join("\n "))
})

logger.on("getMessages", function() {
    console.log("\u001b[01;10mMessages: \u001b[00m\n " + messages.join("\n "))
})

for (let user of ["Ivan", "Petro"]) {
    logger.emit("login", user)
}

for (let msg of ["Hello", "What's up", "Everything fine", "Same here"]) {
    logger.emit("message", msg)
}

logger.emit("getUsers")
logger.emit("getMessages")
