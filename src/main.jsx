import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import ViewDetail from './pages/ViewDetail.jsx'
import AddNewLead from './pages/AddNewLead.jsx'
import EditLead from './pages/EditLead.jsx'
import LeadList from './pages/LeadList.jsx'
import SalesAgent from './pages/SalesAgentsList.jsx'
import AddNewAgent from './pages/AddNewAgent.jsx'
const router=createBrowserRouter([{

  path:"/",
  element:<App/>
},{
  path:"/viewdetails/:id",
  element:<ViewDetail/>
},{
  path:"/addnewlead",
  element:<AddNewLead/>
},{
  path:"/editlead/:id",
  element:<EditLead/>
},{
  path:"leadlist",
  element:<LeadList/>}
,{
  path:"/salesagents",
  element:<SalesAgent/>
},{
  path:"/addagent",
  element:<AddNewAgent/>
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
