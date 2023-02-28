const express = require("express")
const axios = require("axios")
const path = require("path")

let app = express()

const PORT = 8080

const API_KEY = "67525071cac2fe8b36921c6f527f3005"

let HISTORY = [
    { city: "London", country: "UK" }
]

function historyEntry (entry) {
    console.log(`${entry.city}, ${entry.country}`)
    let oldHistory = HISTORY
        .filter(e => !(e.city == entry.city && e.country == entry.country))
    HISTORY = [entry, ...oldHistory].slice(0, 10)
}

app.get("/", (request, response) => {
    response.sendFile(path.resolve("./www/index.html"))
})

app.get("/history.json", (request, response) => {
    response.json(HISTORY)
})

app.get("/weather.json", (request, response) => {
    let cityCountry = {
        city: request.query.city,
        country: request.query.country
    }
    if (!cityCountry.city || !cityCountry.country) {
        response.statusCode = 404
        response.json({
            message: `Can not get weather info for ${cityCountry.city??'null'}, ${cityCountry.country??'null'}`
        })
    }
    axios({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        params: { q: cityCountry.city+","+cityCountry.country, appid: API_KEY }
    })
    .then(weather => {
        if (weather.data) response.json({
            city: cityCountry.city,
            country: cityCountry.country,
            description: weather.data.weather?.at(0)?.description,
            temperature_c: ((weather.data.main?.temp ?? 273) - 273.15) | 0,
            wind_ms: weather.data.wind?.speed ?? 0,
            humidity: (weather.data.main?.humidity ?? 0),
            clouds: weather.data.clouds?.all,
        }) 
        if (weather.data) historyEntry(cityCountry)
    })
    .catch(error => {
        response.statusCode = 404
        response.json({
            message: `Can not get weather info for ${cityCountry.city}, ${cityCountry.country}`
        })
    })
})

module.exports = {
    start() {
        console.log("App listening "+PORT)
        app.listen(PORT)
    }
}
