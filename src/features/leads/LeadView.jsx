import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "./leadSlice";

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
            {lead.tags.map((tag,index)=>
                (<span key={index} className="tag">{tag.name}</span>))}
                 <p className="card-text"><span className="text-head">Time To Close:</span> {lead.timeToClose}</p>
                 <p className="card-text"><span className="text-head">Priority:</span> {lead.priority}</p>
            </div>)
            })
return(<>
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
<p><strong>Leads</strong></p>
<div>
<label htmlFor="filter"><strong>Quick Filter:</strong> </label>
<select id="filter" onChange={event=>setFilter(event.target.value)}>
    <option value="">Select</option>
    <option value="All">All</option>
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Qualified">Qualified</option>
    <option value="Closed">Closed</option>
</select>
</div></div>

<div className="lead-container">

{
displayLeads}
</div>

</>)}
</>)
}
export default LeadView;