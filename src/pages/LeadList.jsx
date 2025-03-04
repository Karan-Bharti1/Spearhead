import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../features/leads/leadSlice";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { fetchTags } from "../features/tags/tagsSlice";
import { fetchSales } from "../features/salesAgents/SalesSlice";
const LeadList=()=>{
    const [filter,setFilter]=useState("")
    const dispatch=useDispatch()
    const leads=useSelector(state=>state.leads)
    const sales=useSelector(state=>state.sales)
    console.log(sales)
    const [salesPerson,setSalesPerson]=useState("")
    useEffect(()=>{
        dispatch(fetchLeads())
        dispatch(fetchSales())
    },[dispatch])
    const filteredLeads=leads.leads?.filter(lead=>{
const matchesFilter=filter===""||filter==="All"||lead.status===filter
const matchesSales=salesPerson===""||lead.salesAgent._id===salesPerson||salesPerson==="All"
return matchesFilter && matchesSales
    })
return(<>
<Header text={"Lead Lists"}/>
<main className="container">
<div className="page-display">
<div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        <div className="content">
            <ul>
              <div className="filterLeadsLists">
               
          
              <div>
              <label htmlFor="filter"><strong>Filter By Status: </strong> </label>
<select id="filter" onChange={event=>setFilter(event.target.value)}>
    <option value="">Select</option>
    <option value="All">All</option>
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Qualified">Qualified</option>
    <option value="Closed">Closed</option>
</select>
</div>
<div>
<label htmlFor="filterSales"><strong>Filter By Sales Agent: </strong></label>
<select id="filterSales" onChange={event=>setSalesPerson(event.target.value)}>
<option value="">Select</option>
<option value="All">All</option>
{sales?.sales?.map(sale=>(<option key={sale._id} value={sale._id}>{sale.name}</option>))}

</select>
</div>

              </div>
{filteredLeads?.map(lead=>(<li key={lead._id} className="leadList"><span className="text-head">{lead.name} [{lead.status}]</span>
<span className="comment-text">~{lead.salesAgent.name}</span></li>))}
</ul>
        </div>
</div>
</main>

</>)
}
export default LeadList;