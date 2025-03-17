import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, fetchQueryStringBasedLeadsData } from "../features/leads/leadSlice";
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
    const [source,setSource]=useState("")
    const [salesPerson,setSalesPerson]=useState("")
    useEffect(()=>{
        dispatch(fetchQueryStringBasedLeadsData({
            key:"status",
            value:filter,
            key1:"salesAgent",
            value1:salesPerson
        }))
        dispatch(fetchSales())
    },[dispatch])
    const getPriorityValue=(priority)=>{
        switch (priority.toLowerCase()){
            case 'high' : return 3
            case 'medium' : return 2
            case 'low': return 1
            default: return 0
        }
    }
    const handleSalesChange=(event)=>{
        const newSalesPerson = event.target.value;
  setSalesPerson(newSalesPerson);
      dispatch(fetchQueryStringBasedLeadsData ( {key:"status",
        value:filter,
        key1:"salesAgent",
        value1:newSalesPerson,
        key2:"source",
        value2:source})  )
    }
    const handleStatusChange=(event)=>{
        const newFilter=event.target.value
        setFilter(newFilter)
      dispatch(fetchQueryStringBasedLeadsData ( {key:"status",
        value:newFilter,
        key1:"salesAgent",
        value1:salesPerson,
        key2:"source",
        value2:source})  )
    }
    const handleSourceChange=(event)=>{
        const newSource=event.target.value
        setSource(newSource)
      dispatch(fetchQueryStringBasedLeadsData ( {key:"status",
        value:filter,
        key1:"salesAgent",
        value1:salesPerson,
        key2:"source",
    value2:newSource,})  )
    }
    const dataToBeSorted=[...leads.leads]
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
<select id="filter" value={filter} onChange={handleStatusChange}>
    <option value="">Select Status</option>
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Qualified">Qualified</option>
    <option value="Closed">Closed</option>
    <option value="Proposal Sent">Proposal Sent</option>
</select>

{" "}
<select id="filterSales" value={salesPerson} onChange={handleSalesChange}>
<option value="">Select Sales Agent</option>

{sales?.sales?.map(sale=>(<option key={sale._id} value={sale._id}>{sale.name}</option>))}

</select>
{" "}
<select id="filter" value={source} onChange={handleSourceChange}>
    <option value="">Select Source</option>
    <option value="Website">Website</option>
    <option value="Referral">Referral</option>
    <option value="Cold Call">Cold Call</option>
    <option value="Advertisement">Advertisement</option>
    <option value="Email">Email</option>
    <option value="Other">Other</option>
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
          {dataToBeSorted.length===0 &&(<><br/><br/> <p className="main-heading">No Leads Found</p></>)}      
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