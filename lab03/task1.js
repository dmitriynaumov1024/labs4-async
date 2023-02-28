/*
    1. Подключите модуль 'events'
    2. Создайт объект logger, используя конструктор EventEmitter
    3. Установите для объекта logger событие message
    4. Опишите для события message функцию обратного вызова, которая принимает 
       в качестве аргумента параметр msg и выводит его в консоль
    5. Вызовите метод emit объекта logger и передайте ему в качестве параметров:
        - название события
        - произвольную строку, например 'Hello, world!'
    6. Сохраните файл, запустите его в консоли и убедитесь в корректной работе кода
*/

const { EventEmitter } = require("node:events")

const logger = new EventEmitter()

logger.on("message", function (message) {
    console.log(message)
})

for (let i=0; i<4; i++) {
    logger.emit("message", `Hello world! x${i}`)
}
