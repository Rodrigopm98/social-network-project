import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { browserRouter } from './routes/routeProvider.jsx'
import './index.css'
import { ContextProvider } from "./provider/ContextProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
        <RouterProvider router={browserRouter} fallbackElement={<p>Loading...</p>}/>
    </ContextProvider>
  </React.StrictMode>,
)
