const write = (message) => process.stdout.write(message)

function log(message) {
    write("\u001b[01;10m[i]\u001b[00m ")
    write(message)
    write("\n")
}

function warn(message) {
    write("\u001b[01;33m[!]\u001b[00;33m ")
    write(message)
    write("\u001b[00m\n")
}

function error(message) {
    write("\u001b[01;31m[x]\u001b[00;31m ")
    write(message)
    write("\u001b[00m\n")
}

module.exports = {
    log, 
    warn,
    error
}
