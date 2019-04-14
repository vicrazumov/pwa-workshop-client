import { goTo } from '../core/router.js'
import { Input } from '../core/dom-api.js'
import ShowModal from './showModal.js'

export default (roomId) => {
  const roomNameInput = new Input({
    autocomplete: 'off',
    placeholder: 'Enter your name and click join'
  })

  const okHandler = () => {
    if (roomNameInput.value) {
      goTo(`/chat?room=${roomId}&name=${roomNameInput.value}`)
      return true
    } else {
      roomNameInput.focus()
    }
  }

  ShowModal({
    okButtonText: 'Join',
    children: [roomNameInput],
    okHandler,
  })

  roomNameInput.focus()
}