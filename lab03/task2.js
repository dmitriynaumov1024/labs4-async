/*
    Создайте два пустых массива: users и msgs
    Измените тело функции обратного вызовы события message. Она должна:
    - выводить в консоль строку 'New message: [полученное сообщение]'
    - добавлять полученное сообщение в виде значения очередного элемента массива msgs
    Установите для объекта logger событие login
    Опишите для события login функцию обратного вызова, которая принимает к качестве 
    аргумента параметр name. Она должна:
    - выводить в консоль строку 'New user: [полученное сообщение]'
    - добавлять полученное сообщение в виде значения очередного элемента массива users
    Добавьте несколько вызовов метода emit объекта logger для обоих событий, передавая
    в качестве второго параметра произвольные значения
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

for (let user of ["Ivan", "Petro", "Sergiy"]) {
    logger.emit("login", user)
}

for (let msg of ["Hello", "What's up", "Everything fine"]) {
    logger.emit("message", msg)
}
