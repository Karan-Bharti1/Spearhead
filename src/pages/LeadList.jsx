import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../features/leads/leadSlice";
import { Link } from "react-router-dom";
import Header from "../components/Header";

import { fetchSales } from "../features/salesAgents/SalesSlice";
const LeadList=()=>{
    const [filter,setFilter]=useState("")
    const dispatch=useDispatch()
    const leads=useSelector(state=>state.leads)
    const sales=useSelector(state=>state.sales)
    const [prioritySort, setPrioritySort] = useState("")
    const [timeSort, setTimeSort] = useState("")
    
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
    const getPriorityValue=(priority)=>{
        switch (priority.toLowerCase()){
            case 'high' : return 3
            case 'medium' : return 2
            case 'low': return 1
            default: return 0
        }
    }
    const dataToBeSorted=[...filteredLeads]
    if(timeSort==="highToLowTime"){
       
        dataToBeSorted.sort((a, b) => b.timeToClose - a.timeToClose)

    }
    if(timeSort==="lowToHighTime"){
        
      dataToBeSorted.sort((a, b) => a.timeToClose - b.timeToClose)

    }
    
       

 if(prioritySort==="highToLowPriority"){
    
    dataToBeSorted.sort((a,b)=>getPriorityValue(b.priority)-getPriorityValue(a.priority))
 }
if(prioritySort==="lowToHighPriority"){
    
  dataToBeSorted.sort((a,b)=>getPriorityValue(a.priority)-getPriorityValue(b.priority))  
 }
return(<>
<Header text={"Lead Lists"}/>
<main className="container">
<div className="page-display">
<div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        <div className="content" >
        {(leads.status==="loading" || sales.status==="loading" )&&(<>
        <h2 className="load">Loading...</h2></>)}
        {leads.status=="error" && <h2 className="sec-heading">Failed to fetch leads data</h2>}
        {leads.status!=="loading" && sales.status!=="loading"&& leads.status!="error" &&sales.status!="error"  && (
       
            <ul>
              <div className="filterLeadsLists">
             <div>
              <label ><strong>Filter By : </strong> </label>
<select id="filter" onChange={event=>setFilter(event.target.value)}>
    <option value="">Select Status</option>
    <option value="All">All</option>
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Qualified">Qualified</option>
    <option value="Closed">Closed</option>
</select>

{" "}
<select id="filterSales" onChange={event=>setSalesPerson(event.target.value)}>
<option value="">Select Sales Agent</option>
<option value="All">All</option>
{sales?.sales?.map(sale=>(<option key={sale._id} value={sale._id}>{sale.name}</option>))}

</select>
</div>
<div><label className=""><strong>Sort By: </strong></label>
<select onChange={event=>setPrioritySort(event.target.value)}>
<option value="" >Sort by Priority</option>
    <option value="highToLowPriority">High to Low Priority</option>
    <option value="lowToHighPriority">Low to High Priority</option>
</select>{" "}
<select onChange={event=>setTimeSort(event.target.value)}>
    <option value="">Sort by Time To Close</option>
    <option value="highToLowTime">High to Low Close Time</option>
    <option value="lowToHighTime">Low to High Close Time</option>
</select>
</div>
<div>
<Link className="link-display" to="/addnewlead"> New Lead</Link>
</div>
          </div>       
{dataToBeSorted?.map(lead=>(<li key={lead._id} className="leadList"><span ><Link to={`/viewdetails/${lead._id}`}>{lead.name} [{lead.status}]</Link></span>
<span className="comment-text">~{lead.salesAgent.name}</span></li>))}
</ul>
        
        )
}
</div></div>
</main>

</>)
}
export default LeadList;