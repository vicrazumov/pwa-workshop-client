import { goTo } from '../core/router.js'
import { List, ListItem, Button, Form, Input, Link, Div } from '../core/dom-api.js'
import showModal from '../utils/showJoinModal.js'
import { SERVER } from '../utils/urls.js'

const mountRoomsList = async () => {
  document.title = 'PWA chat'

  const rooms = await fetch(`${SERVER}/rooms`).then(response => response.json())

  const roomsList = new List(
    { id: 'roomsList' },
    rooms.map(roomId => {
      const handleJoinClick = () => {
        showModal(roomId)
        return false
      }

      const handleRoomClick = () => {
        goTo(`/roomInfo?roomId=${roomId}`)
        return false
      }

      const roomLink = new Link({ onclick: handleRoomClick, href: '#' }, roomId)
      const joinButton = new Button({ onclick: handleJoinClick, style: 'float: right' }, 'Join')
      const roomListItem = new ListItem({}, [roomLink, joinButton])

      return roomListItem
    })
  )

  const nameInput = new Input({ id: 'nameInput', autocomplete: 'off', placeholder: 'your name' })
  const roomInput = new Input({ id: 'roomInput', autocomplete: 'off', placeholder: 'room id' })
  const inputContainer = new Div({ style: 'width: 70%' }, [nameInput, roomInput])

  const joinButton = new Button({}, 'Join')
  const formContainer = new Div({ style: 'display: flex' }, [inputContainer, joinButton])

  const joinForm = new Form({ action: '' }, [formContainer])

  joinForm.onsubmit = () => {
    if (!nameInput.value || !roomInput.value) {
      alert('You need to have a name and the room!')
      return false
    }

    goTo(`/chat?room=${roomInput.value}&name=${nameInput.value}`)
    return false
  }

  const roomsPage = new Div({ className: 'page' }, [roomsList, joinForm])
  return roomsPage
}

export default () => mountRoomsList()