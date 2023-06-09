import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routeConfig.jsx'
import ContextRoot from './ContextRoot.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextRoot>
      <RouterProvider router={router} />
    </ContextRoot>
  </React.StrictMode>,
)
