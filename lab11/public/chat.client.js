let socket = io() // magic 

const clicksToRevealToken = 4

let app = new Vue({
    el: "#app",
    data: {
        username: "",
        loggedin: false,
        challenged: false,
        usernameClickCount: 0,
        showToken: false,
        token: undefined,
        message: "",
        messages: []
    },
    methods: {
        joinButtonClick() {
            socket.emit("chat:join", this.username)
        },
        confirmJoinButtonClick() {
            socket.emit("chat:join", this.username, this.token)
        },
        cancelJoinButtonClick() {
            this.loggedin = false
            this.username = ""
            this.challenged = false
        },
        sendButtonClick() {
            socket.emit("chat:message", this.username, this.token, this.message)
            this.message = ""
            let msgsElement = document.querySelector("#messages")
            setTimeout(() => {
                msgsElement.scrollTop = msgsElement.scrollHeight
            }, 100)
        },
        senderUsernameClick(username) {
            if (username == this.username) { 
                this.usernameClickCount++
                if (this.usernameClickCount % clicksToRevealToken == 0) {
                    this.revealToken()
                }
            }
        },
        revealToken() {
            if (window.confirm("Do you want to see your token to use it for next login?")) {
                window.alert("Your token:  "+this.token)
            }
        }
    },
    mounted() {
        socket.on("chat:challenge", () => {
            this.challenged = true
        })
        socket.on("chat:confirm-join", (username, token) => {
            this.loggedin = true
            this.challenged = false
            this.username = username
            this.token = token
        })
        socket.on("chat:broadcast", (message) => {
            this.messages.push(message)         
        })
        socket.on("chat:error", (message) => {
            console.error(message)
        })
    }
})
