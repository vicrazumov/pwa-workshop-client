import { goTo } from '../core/router.js'
import { Button, Input, Div } from '../core/dom-api.js'

export default (roomId) => {
  const roomNameInput = new Input({
    autocomplete: 'off',
    placeholder: 'Enter your name and click join'
  })
  const joinButton = new Button({ style: 'color: black; background: green' }, 'Join')
  const cancelButton = new Button({ style: 'background: red' }, 'Cancel')

  joinButton.onclick = () => {
    if (roomNameInput.value) {
      goTo(`/chat?room=${roomId}&name=${roomNameInput.value}`)
      modalDiv.parentElement.removeChild(modalDiv)
    } else {
      roomNameInput.focus()
    }
  }

  cancelButton.onclick = () => {
    modalDiv.parentElement.removeChild(modalDiv)
  }

  const modalDiv = new Div({ className: 'modal' }, [roomNameInput, joinButton, cancelButton])
  document.querySelector('body').appendChild(modalDiv)
  roomNameInput.focus()
}