/*global moment*/
import { Button, Div, List, ListItem } from '../core/dom-api.js'
import showModal from '../utils/showJoinModal.js'
import loadExternalLib from '../utils/loadExternalLib.js'
import { MOMENT_URL, SERVER } from '../utils/urls.js'

const mountRoomInfo = async (roomId) => {
  if (!window.moment) {
    await loadExternalLib(MOMENT_URL)
  }

  document.title = `Room Info - ${roomId}`

  const room = await fetch(`${SERVER}/rooms/${roomId}`).then(response => response.json())
  const createdAt = `<div style="font-size: 20px; margin: 10px">Created: ${moment(room.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>`

  const usersList = new List({}, room.users.map(user => new ListItem({}, user)))

  const handleJoinClick = () => {
    showModal(roomId)
    return false
  }
  const joinButton = new Button({ onclick: handleJoinClick }, 'Join')

  const roomInfoPage = new Div({ className: 'page' }, [createdAt, joinButton, usersList])
  return roomInfoPage
}

export default ({ routeParams }) => mountRoomInfo(routeParams.roomId)