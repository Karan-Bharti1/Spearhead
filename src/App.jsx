

import './App.css'
import Header from './components/Header'
import { Link } from 'react-router-dom'
import LeadView from './features/leads/LeadView'

function App() {
  

  return (
    <>
     <Header text={"CRM Dashboard"}/>
     <main className='container'>
<div className='page-display'>
  <div className='sidebar'>
    <h2 className='sidebar-text'>Sidebar</h2>
<Link className='btn-primary' to={"/leadlist"}>Leads</Link>
<Link className='btn-primary'>Sales</Link>
<Link className='btn-primary'>Agents</Link>
<Link className='btn-primary'>Reports</Link>
<Link className='btn-primary'>Settings</Link>
  </div>
  <div className='content'>
    <LeadView/>
  </div>
</div>
     </main>
    </>
  )
}

export default App
