/*global io*/

import { List, ListItem, Button, Form, Input, Div } from '../core/dom-api.js'
import loadExternalLib from '../utils/loadExternalLib.js'
import { SOCKET_IO_URL, SERVER } from '../utils/urls.js'

const initChat = async (roomId, name) => {
  if (!window.io) {
    await loadExternalLib(SOCKET_IO_URL)
  }

  const socket = io(SERVER)
  socket.emit('join', roomId, name, (error) =>
    error ? console.error(error) : () => {}
  )

  document.title = `PWA chat - ${roomId}`

  const chatInput = new Input({ id: 'chatInput', autocomplete: 'off' })
  const chatButton = new Button({}, 'Send')
  const formContainer = new Div({ style: 'display: flex' }, [chatInput, chatButton])
  const chatForm = new Form({ action: '' }, [formContainer])

  chatForm.onsubmit = () => {
    if (navigator.onLine) {
      socket.emit('chat message', chatInput.value)
      chatInput.value = ''
    }
    return false
  }

  const messagesList = new List({ id: 'messages' })
  socket.on('chat message', (msg, name) => {
    const msgItem = new ListItem({}, `${name}: ${msg}`)
    messagesList.appendChild(msgItem)
    messagesList.scrollTop = messagesList.scrollHeight
  })

  socket.on('system message', msg => {
    const msgItem = new ListItem({ className: 'systemMessage' }, msg)
    messagesList.appendChild(msgItem)
    messagesList.scrollTop = messagesList.scrollHeight
  })

  const chatPage = new Div({ className: 'page' }, [messagesList, chatForm])
  chatPage.onUnmount = () => socket.close()

  chatInput.focus()

  return chatPage
}

export default ({ routeParams }) => initChat(routeParams.room, routeParams.name)