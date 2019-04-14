import { Div } from './core/dom-api.js'
import { initialize, backButton } from './core/router.js'
import Rooms from './pages/rooms.js'
import ShowModal from './utils/showModal.js'

const asyncLoader = path => async params => {
  const module = await import(path)
  return module.default(params)
}

const container = document.querySelector('#container')

const routes = {
  '/': Rooms,
  '/chat': asyncLoader('./pages/chat.js'),
  '/roomInfo': asyncLoader('./pages/roomInfo.js'),
}

initialize(routes, container)

const nav = document.querySelector('#nav')
nav.appendChild(backButton)

const offlineStatus = new Div({ className: 'offline' }, 'Offline')
window.addEventListener('online', () => nav.removeChild(offlineStatus))
window.addEventListener('offline', () => nav.appendChild(offlineStatus))

if (!navigator.standalone && navigator.platform === 'iPhone' && !localStorage.getItem('installationPromptSeen')) {
  ShowModal({
    children: ['You can install this app to your iPhone! Just click "Share" and then "Add to home screen"'],
    noCancel: true,
  })

  localStorage.setItem('installationPromptSeen', 'true')
}