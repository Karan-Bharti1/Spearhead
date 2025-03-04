import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editLeadData, fetchLeads } from "../features/leads/leadSlice";
import LeadForm from "../components/LeadForm";
import { fetchSales } from "../features/salesAgents/SalesSlice";
import { fetchTags } from "../features/tags/tagsSlice";

const EditLead=()=>{
    const {id}=useParams()
    const leads = useSelector(state => state.leads);
const tags = useSelector(state => state.tags);
const sales = useSelector(state => state.sales);

    const dispatch=useDispatch()
    const [leadData,setLeadData]=useState({ name:"",
        source:"",
        salesAgent:"",
        status:"",
        tags:[],
        timeToClose:"",
        priority:"",
        closedAt:"" })
    useEffect(()=>{
        dispatch(fetchLeads())
        dispatch(fetchSales())
        dispatch(fetchTags())
    },[id])

 
   

    useEffect(() => {
        if (!leads.leads?.length) return; 
        
        const data = leads.leads.find(lead => lead._id === id);
        if (!data) return;
        
        // Add more logging to understand the data structure
        console.log("Found lead data:", JSON.stringify(data));
        
        // Check the structure of salesAgent in the data
        const salesAgentId = data.salesAgent?._id 
            ? data.salesAgent._id 
            : (typeof data.salesAgent === 'string' ? data.salesAgent : '');
            
        // Check the structure of tags in the data
        const tagsList = Array.isArray(data.tags)
            ? data.tags.map(tag => {
                // Handle both object tags and string tags
                if (typeof tag === 'object' && tag?._id && tag?.name) {
                    return { value: tag._id, label: tag.name };
                } else if (typeof tag === 'string') {
                    // If tag is just an ID, look up the name from tags.tags
                    const tagObj = tags.tags.find(t => t._id === tag);
                    return tagObj ? { value: tagObj._id, label: tagObj.name } : { value: tag, label: "Unknown" };
                }
                return null;
            }).filter(Boolean) 
            : [];
        
        const requiredSales = {
            ...data,
            salesAgent: salesAgentId,
            tags: tagsList
        };
        
        console.log("Setting leadData:", JSON.stringify(requiredSales));
        setLeadData(requiredSales);
    }, [leads.leads, id, tags.tags]);  // Make sure to include tags.tags as a dependency
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
   
    const options=tags?.tags?.map(tag=>({value:tag._id,label:tag.name}))

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Ensure tags is an array of tag IDs
        const processedTags = Array.isArray(leadData.tags) 
            ? leadData.tags.map(tag => typeof tag === 'object' ? tag.value : tag)
            : [];
            
        const dataToBeSubmitted = {
            ...leadData,
            tags: processedTags
        };
        
        console.log("Submitting data:", JSON.stringify(dataToBeSubmitted));
        dispatch(editLeadData({id, data: dataToBeSubmitted}));
        
        
    }
    
    return(<>
    <Header text={"Edit Lead"}/>
    <main className="container">
   {leads.status!="loading" && <div className="page-display">
        <div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        <div className="content">
            <LeadForm handleChange={handleChange} handleSubmit={handleSubmit} handleMultiDropDown={handleMultiDropDown} leadData={leadData}
            setLeadData={setLeadData} options={options} sales={sales}/>
        </div>
        </div>}
    </main>
    </>)
}
export default EditLead;