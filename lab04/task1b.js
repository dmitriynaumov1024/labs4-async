/*
    1. Подключите модуль 'fs'
    2. Создайте поток для чтения файла index.html
    3. Опишите для события data функцию обратного вызова, которая выводит 
       в консоль содержимое файла index.html
    4. Сохраните файл, запустите его в консоли и убедитесь в корректной работе.
*/

const fs = require("node:fs")

let stream = fs.createReadStream("./big-page.html")
let counter = 0
stream.on("data", (data) => {
    counter += 1
    // console.log(counter + " " + data.toString())
})
stream.on("close", () => {
    console.log(`Total ${counter} chunks`)
})
