import { Button } from './dom-api.js'

// View Container
let container
let currentView
let routes = {}

function _cleanContainer() {
  if (currentView && currentView.parentElement) {
    if (currentView.onUnmount) {
      currentView.onUnmount()
    }
    currentView.parentElement.removeChild(currentView)
  }

  container.innerHTML = ''
}

async function mountRouteElement(elem, routeParams) {
  _cleanContainer()

  currentView = await elem({ container, routeParams })

  container.appendChild(currentView)
}

function getFullUrl(href) {
  return href.split(location.host)[1]
}

/**
 * Returns the location params from url
 * @returns {object}
 */
function getLocationParams() {
  let out = {}

  // Parse the location object
  location.search.substr(1).split('&').forEach(parts => {
    let values = parts.split('=')
    out[values[0]] = values[1]
  })

  return out
}

export const loadRoute = (url, noPush) => {
  const currentUrl = url || getFullUrl(location.href)
  const currentRoute = currentUrl.split('?')[0]

  const route = routes[currentRoute]

  if (route) {
    mountRouteElement(route, Object.assign({}, getLocationParams(), { noPush }))
    if (history.state) {
      backButton.classList.remove('hidden')
    } else {
      backButton.classList.add('hidden')
    }
  } else {
    console.log('no route found')
  }
}

window.handleOnClick = function handleOnClick(e) {

  const url = e.target.getAttribute('href')

  e.stopImmediatePropagation()
  e.preventDefault()

  // Push the state
  window.history.pushState({ pathname: url.split('?')[0] }, '', url)
  window.handlePushState(url, true)

  return false
}

window.handlePushState = loadRoute
window.addEventListener('popstate', e => {
  if (e.state) {
    loadRoute(e.state.pathname, true)
  } else {
    loadRoute('/', true)
  }
})

export const goTo = path => {
  const url = path.split('?')[0]
  window.history.pushState({ pathname: url }, '', path)
  window.handlePushState(path, true)
}

export const initialize = (routesDefinition, containerElement) => {
  routes = routesDefinition
  container = containerElement

  loadRoute()
}

const goBack = () => {
  window.history.back()
}

export const backButton = new Button({ onclick: () => goBack(), className: 'backButton' }, '<')
