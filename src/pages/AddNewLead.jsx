import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../features/salesAgents/SalesSlice";
import { fetchTags } from "../features/tags/tagsSlice";
import Select from "react-select";
const AddNewLead=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
dispatch(fetchSales())
dispatch(fetchTags())
    },[dispatch])
    const {sales,tags}=useSelector(state=>state)
  
    const [leadData,setLeadData]=useState({
        name:"",
       source:"",
       salesAgent:"",
       status:"",
       tags:[],
       timeToClose:"",
       priority:"",
       closedAt:"" 
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLeadData((prev) => ({
          ...prev,
          [name]: name === "timeToClose" ? parseFloat(value) : value,
        }));
      };
    const handleMultiDropDown=(selectedOptions)=>{
setLeadData(prev=>({...prev,tags:selectedOptions}))
    }
    console.log(leadData)
    const options=tags?.tags?.map(tag=>({value:tag._id,label:tag.name}))
    
    return(<>
    <Header text="Add New Lead"/>
    <main className='container'>
    <div className="page-display">
        <div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        <div className="content">
            <p className="main-heading">Lead Form</p>
<form className="form">
<label htmlFor="name" className="text-head"><strong>Name: </strong></label>
<input className="form-control" type="text"  name="name" id="name" value={leadData.name} onChange={handleChange}/>
<br/><br/>
<label htmlFor="source" className="text-head"><strong>Source:</strong></label>
<select  id="source" className="form-control">
<option  value="">Select a field</option>
<option value="Referral">Referral</option>
<option value="Cold Call">Cold Call</option>
<option value="Advertisement">Advertisement</option>
<option value="Email">Email</option>
<option value="Other">Other</option>
</select>
<br/><br/>
<label htmlFor="sales" className="text-head"><strong>Sales Agent:</strong></label>
<select  id="sales" className="form-control">
<option  value="">Select a field</option>
{sales?.sales?.map(agent=>(<option key={agent._id} value={agent._id}>{agent.name}</option>))}
</select>
<br/><br/>
<label htmlFor="tags" className="text-head"><strong>Select Multiple Tags:</strong></label>
<Select className="multi" options={options} value={leadData.tags} isMulti onChange={handleMultiDropDown}
/>
<br/>
<label htmlFor="timeToClose" className="text-head"><strong>Time To Close: </strong></label>
<input className="form-control" type="number"  name="timeToClose" id="name" value={leadData.timeToClose} onChange={handleChange}/>
<br/><br/>
<label htmlFor="status" className="text-head"><strong>Status:</strong></label>
<select  id="status" className="form-control" name="status" value={leadData.status} onChange={handleChange}>
<option  value="">Select a field</option>
<option value="New">New</option>
<option value="Contacted">Contacted</option>
<option value="Qualified">Qualified</option>
<option value="Proposal Sent">Proposal Sent</option>
<option value="Closed">Closed</option>
</select>
<br/><br/>
<label htmlFor="priority" className="text-head"><strong>Priority:</strong></label>
<select  id="priority" className="form-control" name="priority" value={leadData.priority} onChange={handleChange}>
<option  value="">Select a field</option>
<option value="High">High</option>
<option value="Medium">Medium</option>
<option value="Low">Low</option>

</select>
{leadData.status==="Closed" && (<>
<input type="date"/>
</>)}
</form>

        </div>
        </div>
        </main></>)
}
export default AddNewLead;