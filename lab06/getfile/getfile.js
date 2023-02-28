const fs = require("node:fs")

module.exports = function getFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, error => {
            if (error) {
                reject()
                return
            }
            let file = fs.createReadStream(filePath)
            file.pipeAsync = (destination) => {
                file.pipe(destination)
                return new Promise((resolve, reject) =>{
                    file.on("close", () => resolve())
                })
            }
            resolve(file)
        })
    })
}
