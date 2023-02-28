let socket = null

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
            socket.sendJson({ 
                type: "join", 
                username: this.username 
            })
            this.loggedin = true
        },
        sendButtonClick() {
            socket.sendJson({
                type: "message",
                message: this.message
            })
            this.message = ""
            let msgsElement = document.querySelector("#messages")
            setTimeout(() => {
                msgsElement.scrollTop = msgsElement.scrollHeight
            }, 100)
        }
    },
    mounted() {
        socket = new WebSocket("ws://"+window.location.host+"/chat")
        socket.onopen = () => {
            console.log("connected!")
        }
        socket.sendJson = (data) => {
            socket.send(JSON.stringify(data))
        }
        socket.onmessage = (event) => {
            console.log(event.data)
            this.messages.push(JSON.parse(event.data))
        }
    }
})
