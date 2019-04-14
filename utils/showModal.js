import { goTo } from '../core/router.js'
import { Button, Div } from '../core/dom-api.js'

export default ({ okButtonText, cancelButtonText, okHandler, cancelHandler, noCancel, children }) => {
  const okButton = new Button({ style: 'color: black; background: green' }, okButtonText || 'OK')
  const cancelButton = new Button({ style: 'background: red' }, cancelButtonText || 'Cancel')

  okButton.onclick = () => {
    // if no handler or returns true
    if (!okHandler || okHandler()) {
      modalDiv.parentElement.removeChild(modalDiv)
    }
  }

  cancelButton.onclick = () => {
    if (cancelHandler) {
      cancelHandler()
    }
    modalDiv.parentElement.removeChild(modalDiv)
  }

  const _children = []
  if (children) {
    _children.push(...children)
  }

  _children.push(okButton)

  if (!noCancel) {
    _children.push(cancelButton)
  }

  const modalDiv = new Div({ className: 'modal' }, _children)
  document.querySelector('body').appendChild(modalDiv)
}