let userName;

Swal.fire({
  title: "Write your name",
  input: "text",
  inputValidator: (value) => !value && "Please, write your name",
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((res) => {
  userName = res.value;
  document.querySelector("#userName").innerHTML = userName;
  socket.emit("auth", userName);
});

const send = () => {
    if (chatBox.value !== ''){
        socket.emit('new_message', {
            userName,
            message: chatBox.value.toString()
        })
        chatBox.value = ''
    }
}

const chatBox = document.querySelector('#chatBox')
const sendBtn = document.querySelector('#sendBtn')
chatBox.addEventListener('keyup', e => {if (e.key === 'Enter') send()})
sendBtn.addEventListener('click', send)

socket.on('all_messages', data => {
    document.querySelector('#messages').innerHTML = data.map(msg => {

        // Creo los nodos y les inserto el contenido en texto (evito que inserten etiquetas)
        const msgElement = document.createElement('p')
        msgElement.appendChild(document.createTextNode(msg.message))

        const userNameElement = document.createElement('h6')
        userNameElement.appendChild(document.createTextNode('- ' + msg.userName))

        const container = document.createElement('div') // Creo el nodo contenedor
        container.append(userNameElement, msgElement)   // Agrego el username y el msg
        container.classList.add('message')

        return container.outerHTML // Retorno el HTML
    }).join('')
})