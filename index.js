import { initialize } from './core/router.js'
import Rooms from './pages/rooms.js'

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