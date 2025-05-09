import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "./leadSlice";
import { Link } from "react-router-dom";

const LeadView=()=>{
    const [filter,setFilter]=useState("")
    const dispatch=useDispatch()
    const state=useSelector(state=>state.leads)
    
    useEffect(()=>{
        dispatch(fetchLeads())
    },[dispatch])
    const filteredLeads=state.leads?.filter(lead=>{
const matchesFilter=filter===""||filter==="All"||lead.status===filter
return matchesFilter
    })
   
    const newLeads=state.leads?.filter(lead=>lead.status==="New")
    const contactedLeads=state.leads?.filter(lead=>lead.status==="Contacted")
    const qualifiedLeads=state.leads?.filter(lead=>lead.status==="Qualified")
    const displayLeads=filteredLeads.map((lead)=>{
        return (<div  key={lead._id} className="card">
            <p className="lead-display"><strong>{lead.name}📈⚖️</strong></p>
            <hr />
            <p className="card-text"><span className="text-head">Source:</span> {lead.source}</p>
            <p className="card-text"><span className="text-head">Sales Agent:</span> {lead.salesAgent.name}</p>
            <p className="card-text"><span className="text-head">Status:</span> {lead.status}</p>
            <p className="card-text"><span className="text-head">Tags:</span> </p>
            <div className="tag-card">
            {lead.tags.map((tag,index)=>
                (<span key={index} className="tag">{tag.name}</span>))}
                </div>
                 <p className="card-text"><span className="text-head">Time To Close:</span> {lead.timeToClose}</p>
                 <p className="card-text"><span className="text-head">Priority:</span> {lead.priority}</p>
                 <Link className="link-display" to={`/viewdetails/${lead._id}`}>View Details</Link>
            </div>)
            })
return(<>
{state.status==="loading" && (<>
<h2 className="load">Loading...</h2></>)}
{state.status=="error" && (<>
<h2 className="main-heading">Failed to fetch leads Data</h2>
</>)}
{state.status==="succeeded" &&(<><p className="main-heading">Leads Management System</p>
    <div className="lead-status">

<p className="sec-heading">Lead Status</p>
<div className="status-container">
   
<p><strong>Total Leads:</strong> {state.leads.length}</p>
<p><strong>New Leads:</strong> {newLeads.length}</p>

<p><strong>Contacted Leads:</strong> {contactedLeads.length}</p>
<p><strong>Qualified Leads:</strong> {qualifiedLeads.length}</p>

</div>

</div>
<div className="lead-filter">


<div >
<label htmlFor="filter"><strong> Filter:</strong> </label>
<select id="filter" onChange={event=>setFilter(event.target.value)}>
    <option value="">Select Status</option>
    <option value="All">All</option>
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Qualified">Qualified</option>
    <option value="Closed">Closed</option>
    <option value="Proposal Sent">Proposal Sent</option>
</select>
</div>
<div><Link className="link-display" to="/addnewlead">New Lead</Link></div></div>

<div className="lead-container">
{displayLeads}
</div>

</>)}
</>)
}
export default LeadView;