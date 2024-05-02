require('dotenv').config()

let bodyParser = require('body-parser')

let express = require('express');
let app = express();

console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

// intento de uso de un "post"
app.post("/eshoradepost", (req, res) => {
    res.send(req.body.hello)
})

// post de name

app.post("/name", (req, res)=>{
    res.json({name: `${req.body.first} ${req.body.last}`})
})

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

// Crea un servidor echo montado en la ruta GET /:word/echo , responde con un JSON con {echo: word}

app.get("/:word/echo", (req, res) => {
    res.json({"echo": req.params.word})
})

// Crea un endpoint de API montado en la ruta GET /name, responde con un JSON con {name: 'firstname lastname'}
// firstname y lastname deben estar codificados dentro de la ruta en un query string like ?first=firstname&last=lastname

app.get("/name", (req, res) => {
    res.json({"name": `${req.query.first} ${req.query.last}`})
})




































 module.exports = app;
