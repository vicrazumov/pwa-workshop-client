import { Script } from '../core/dom-api.js'

export default async src => {
  await new Promise(resolve => {
    const script = new Script({
      src,
      onload: resolve,
    })
    document.querySelector('body').appendChild(script)
  })
}