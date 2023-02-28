let socket = null

let app = new Vue({
    el: "#app",
    data: {
        password: "",
        alive: true
    },
    methods: {
        stopButtonClick() {
            axios.post("/stop", { password: this.password })
            .then(response => this.password = "")
            .catch(response => this.alive = false)
        }
    },
    mounted() {

    }
})
