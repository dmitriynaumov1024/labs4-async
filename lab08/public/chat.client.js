let socket = io() // will be magically resolved by socket.io server

let app = new Vue({
    el: "#app",
    data: {
        username: "",
        loggedin: false,
        message: "",
        messages: []
    },
    methods: {
        joinButtonClick() {
            socket.emit("join", this.username, success => {
                this.loggedin = success
            })
        },
        sendButtonClick() {
            socket.emit("send", this.message)
            this.message = ""
            let msgsElement = document.querySelector("#messages")
            setTimeout(() => msgsElement.scrollTop = msgsElement.scrollHeight, 100)
        }
    },
    mounted() {
        socket.on("message", (message) => {
            this.messages.push(message)
        })
    }
})
