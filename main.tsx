import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './config/i18n'
import App from './view/App.tsx'
import './index.css'
import { base } from './config/assets.ts'

ReactDOM.createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <BrowserRouter basename={base()}>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
