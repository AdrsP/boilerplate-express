require('dotenv').config()

let express = require('express');
let app = express();

console.log("Hello World");

// root-level middleware el cual a todas las solicitudes desglosa el metodo (GET, PUT, POST etc) + la ruta con que los llaman + el ip del que se llama 
// se debe definir antes que todos los metodos para que pueda leerlos si se define luego no tiene acceso a esos metodos

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

// app.get( "/" , (req, res) => {
//     res.send('Hello Express')
// })

let absolutePath = __dirname + '/views/index.html'

app.get("/", (req, res) => {
    res.sendFile(absolutePath)
}  )

app.use("/public", express.static(__dirname + '/public'));

// crear una api sencilla que responda con JSON al camino-ruta /json 

app.get("/json", (req, res) => {
    (process.env.MESSAGE_STYLE === 'uppercase' ? res.json({"message": "HELLO JSON"}) : res.json({"message": "Hello json"}))  
})

// chain middleware

app.get("/now", (req, res, next) => {
    req.time = new Date().toString()
    next();
}, (req, res) => {
    res.json({"time": req.time})
} )




































 module.exports = app;
