const socket = io()

// socket.emit('message', 'Hola desde cliente')

// socket.on('recibe_uno', data => {
//     console.log(data)
// })

// socket.on('reciben_todos_menos_uno', data => {
//     console.log(data)
// })

// socket.on('reciben_todos', data => {
//     console.log(data)
// })

const button = document.querySelector('#sendInfo')
const input = document.querySelector('#inputInfo')
const p = document.querySelector('#outputInfo')


button.addEventListener('click', () => {
    socket.emit('message', input.value)
})  

socket.on('messages', data =>{
    p.innerHTML = `
        <ul>
            ${data.map(d => `<li>ID: ${d.id} ${d.data}</li>`)}
        </ul>
    `
})