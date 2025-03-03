import Select from "react-select";
const LeadForm=({handleChange,handleSubmit,leadData,setLeadData,handleMultiDropDown,options,sales})=>{
    return(<>
    <form className="form" onSubmit={handleSubmit}>
<label htmlFor="name" className="text-head"><strong>Name: </strong></label>
<input className="form-control" type="text"  name="name" id="name" value={leadData.name||""} onChange={handleChange}/>
<br/><br/>
<label htmlFor="source" className="text-head"><strong>Source:</strong></label>
<select  id="source"  name="source" value={leadData.source||""} className="form-control" onChange={handleChange}>
<option  value="">Select a field</option>
<option value="Referral">Referral</option>
<option value="Cold Call">Cold Call</option>
<option value="Advertisement">Advertisement</option>
<option value="Email">Email</option>
<option value="Other">Other</option>
</select>
<br/><br/>
<label htmlFor="sales"  className="text-head"><strong>Sales Agent:</strong></label>
<select  id="sales" name="salesAgent" value={leadData.salesAgent||""} className="form-control" onChange={handleChange}>
<option  value="">Select a field</option>
{sales?.sales?.map(agent=>(<option key={agent._id} value={agent._id}>{agent.name}</option>))}
</select>
<br/><br/>
<label htmlFor="tags" className="text-head"><strong>Select Multiple Tags:</strong></label>
<Select className="multi" options={options} value={leadData.tags||""} isMulti onChange={handleMultiDropDown}
/>
<br/>
<label htmlFor="timeToClose" className="text-head"><strong>Time To Close(in days): </strong></label>
<input className="form-control" type="number"  name="timeToClose" id="name" value={leadData.timeToClose||""} onChange={handleChange}/>
<br/><br/>
<label htmlFor="status" className="text-head"><strong>Status:</strong></label>
<select  id="status" className="form-control" name="status" value={leadData.status||""} onChange={handleChange}>
<option  value="">Select a field</option>
<option value="New">New</option>
<option value="Contacted">Contacted</option>
<option value="Qualified">Qualified</option>
<option value="Proposal Sent">Proposal Sent</option>
<option value="Closed">Closed</option>
</select>
<br/><br/>
<label htmlFor="priority" className="text-head"><strong>Priority:</strong></label>
<select  id="priority" className="form-control" name="priority" value={leadData.priority||""} onChange={handleChange}>
<option  value="">Select a field</option>
<option value="High">High</option>
<option value="Medium">Medium</option>
<option value="Low">Low</option>

</select>

{leadData.status==="Closed" && (<>
<br/><br/>
<label className="text-head"><strong>Closure Date and Time:</strong></label>
<input type="datetime-local" className="form-control" name="closedAt" value={leadData.closedAt} onChange={event=>setLeadData(prev=>({
    ...prev,closedAt:event.target.value
}))}/>

</>)}
<br/><br/>
<button className="link-display" type="submit">Assign Lead</button>
</form>
    </>)
}
export default LeadForm;