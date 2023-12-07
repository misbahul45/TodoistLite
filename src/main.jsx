import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteApp from './RouteApp'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteApp />
    </Provider>
  </React.StrictMode>,
)
