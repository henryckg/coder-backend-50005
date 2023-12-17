import express from "express";
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'


const app = express()
const PORT = 8080;

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: 'true'}))

app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('index')
})

const httpServer = app.listen(PORT, () => {
    console.log(`Server running from ${PORT}`)
})

const socketServer = new Server(httpServer)

const messages = []

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('message', data => {
        messages.push({id: socket.id, data})
        socketServer.emit('messages', messages)
    })

    

    // socket.emit('recibe_uno', 'Esta info la recibe uno solo')
    // socket.broadcast.emit('reciben_todos_menos_uno', 'Los reciben todos menos el que solicitó')
    // socketServer.emit('reciben_todos', 'todos reciben este mensaje')
})