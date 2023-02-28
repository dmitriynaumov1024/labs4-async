/*
    1. Подключите модуль 'fs'
    2. Создайте поток для чтения файла index.html
    3. Опишите для события data функцию обратного вызова, которая выводит 
       в консоль содержимое файла index.html
    4. Сохраните файл, запустите его в консоли и убедитесь в корректной работе.
*/

const fs = require("node:fs")

let stream = fs.createReadStream("./index.html")
stream.on("data", (data) => {
    console.log(data.toString())
})
