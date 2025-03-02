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
    },[dispatch,id])
console.log(leads.leads)
    useEffect(() => {
        if (!leads.leads?.length) return; 
        const data = leads.leads.find(lead => lead._id === id);
        if (!data) return;
        
        const requiredSales = sales?.sales?.find(sale => sale._id === data.salesAgent?._id);
        const newData = { ...data, salesAgent: requiredSales?._id || "" };
        const requiredData = { ...newData, tags: newData.tags.map(tag => ({ value: tag._id, label: tag.name })) };
        setLeadData(requiredData);
    }, [leads.leads, id, sales.sales]);
    
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
    const handleSubmit=(event)=>{
        event.preventDefault()
        const dataToBeSubmitted={...leadData,tags:leadData.tags.map(tag=>tag.value)}
       dispatch(editLeadData({id,data:dataToBeSubmitted}))

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