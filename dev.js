import { MainContainer } from './src/MainContainer'
import { config } from './consent.config'
import './src/styles.css'
import './global.css'

const acceptAll = categories => {
  console.log('Accept All:', categories)
}

const rejectAll = categories => {
  console.log('Reject All:', categories)
}

const applySettings = categories => {
  console.log('Save Settings:', categories)
}

window.addEventListener('load', () => {
  const delegates = { acceptAll, rejectAll, applySettings }
  const consent = new MainContainer(document.body, config, delegates)
  consent.subscribeListeners()
  consent.showConsent(150)
})
