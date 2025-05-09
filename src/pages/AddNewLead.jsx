import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../features/salesAgents/SalesSlice";
import { fetchTags } from "../features/tags/tagsSlice";
import LeadForm from "../components/LeadForm";
import { addLead } from "../features/leads/leadSlice";
const AddNewLead=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
dispatch(fetchSales())
dispatch(fetchTags())
    },[dispatch])
    const leads = useSelector(state => state.leads);
const tags = useSelector(state => state.tags);
const sales = useSelector(state => state.sales);
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
const [message,setMessage]=useState("")
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLeadData((prev) => ({
          ...prev,
          [name]: name === "timeToClose" ? parseFloat(value) : value,
        }));
      };
console.log(leadData.closedAt)
    const handleMultiDropDown=(selectedOptions)=>{
setLeadData(prev=>({...prev,tags:selectedOptions}))
    }
   
    const options=tags?.tags?.map(tag=>({value:tag._id,label:tag.name}))
    const handleSubmit = (event) => {
        event.preventDefault()
        
        const leadDataToSubmit = {
            ...leadData,
            tags: leadData.tags.map(tag => tag.value), // Extract only tag IDs
        };
        
        // Check if all required fields are filled
        if (leadData.name && leadData.source && leadData.salesAgent && 
            leadData.tags.length > 0 && leadData.status && leadData.priority) {
            
            dispatch(addLead(leadDataToSubmit))
                .then((result) => {
                    if (!result.error) {
                        setMessage("Lead assigned to the sales agent successfully")
                        // Only reset form on success
                        setLeadData({
                            name: "",
                            source: "",
                            salesAgent: "",
                            status: "",
                            tags: [],
                            timeToClose: "",
                            priority: "",
                            closedAt: "" 
                        })
                    } else {
                        setMessage("Failed to assign lead to the agent")
                    }
                    
                    setTimeout(() => {
                        setMessage("")    
                    }, 1500);
                })
                .catch((error) => {
                    setMessage("Failed to assign lead to the agent")
                    setTimeout(() => {
                        setMessage("")    
                    }, 1500);
                });
        } else {
            setMessage("Please fill all required fields")
            setTimeout(() => {
                setMessage("")    
            }, 1500);
        }
    }
//    const handleSubmit=(event)=>{
// event.preventDefault()

// const leadDataToSubmit = {
//     ...leadData,
//     tags: leadData.tags.map(tag => tag.value), // Extract only tag IDs
// };

// dispatch(addLead(leadDataToSubmit))
// if( leads.status==="succeeded" && leadData.name && leadData.source && leadData.salesAgent && leadData.tags && leadData.tags && leadData.status && leadData.priority) 
//      {setMessage("Lead Assigned to the sales agent successfully")
// setTimeout(() => {
// setMessage("")    
// }, 1500);}
// setLeadData({
//     name:"",
//     source:"",
//     salesAgent:"",
//     status:"",
//     tags:[],
//     timeToClose:"",
//     priority:"",
//     closedAt:"" 
// })
//    }
    return(<>
    <Header text="Add New Lead"/>
    <main className='container'>
    <div className="page-display">
        <div className="sidebar">
            <div >
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        </div>
        <div className="content">
            <p className="main-heading">Lead Form</p>

<LeadForm handleChange={handleChange} handleSubmit={handleSubmit} leadData={leadData} setLeadData={setLeadData}
handleMultiDropDown={handleMultiDropDown} options={options} sales={sales}/>
<h2>{message}</h2>

        </div>
        </div>
        </main></>)
}
export default AddNewLead;