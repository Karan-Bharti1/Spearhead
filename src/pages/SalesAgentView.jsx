import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { fetchSales } from "../features/salesAgents/SalesSlice";
import { fetchQueryStringBasedLeadsData } from "../features/leads/leadSlice";
const SalesAgentView=()=>{
    const dispatch=useDispatch()
    const leads=useSelector(state=>state.leads)
    const sales=useSelector(state=>state.sales)
    const [salesPerson,setSalesPerson]=useState("")
    const [selectStatus,setSelectStatus]=useState("")
    const [selectPriority,setSelectPriority]=useState("")
    const [timeSort, setTimeSort] = useState("")
 const [data,setData]=useState([])
      useEffect(()=>{
    dispatch(fetchSales())
        },[dispatch])
        useEffect(()=>{
            setData(leads.leads)
           },[leads])
        const handleChange=event=>{
            const agent=event.target.value
            setSalesPerson(agent)
            if(agent)
{dispatch(fetchQueryStringBasedLeadsData({
    key:"salesAgent",
    value:agent
}))
setSelectPriority("")
setSelectStatus("")}
setTimeSort("")
        }
       
    const filteredData=[...data] 
    const handleStatus=event=>{
      const newStatus=event.target.value
      setSelectStatus(newStatus)
      setTimeSort("")
    
      dispatch(fetchQueryStringBasedLeadsData({
        key:"salesAgent",
        value:salesPerson,
          key1:"status",
          value1:newStatus,
          key2:"priority",
          value2:selectPriority
      }))
  }
    const handlePriority=event=>{
      const newPriority=event.target.value
      setSelectPriority(newPriority)
      setTimeSort("")
    
      dispatch(fetchQueryStringBasedLeadsData({
        key:"salesAgent",
        value:salesPerson,
          key1:"status",
          value1:selectStatus,
          key2:"priority",
          value2:newPriority
      }))
  }
    if(timeSort==="highToLowTime"){
       
        filteredData.sort((a, b) => b.timeToClose - a.timeToClose)
     
     }
     if(timeSort==="lowToHighTime"){
         
       filteredData.sort((a, b) => a.timeToClose - b.timeToClose)
     
     }
    return(<>
    <Header text={"Sales Agent View"}/>
    <main className="container">
    <div className="page-display">
<div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        <div className="content">
       { sales.status === "error" && <h2 className="load">Failed To fetch sales agents Data</h2>}
       {sales.status !== "error" && <div>
        <div>
            <h3>Select any Sales Agent:{" "}

<select onChange={handleChange}>
<option value="">Select Sales Agent</option>

{sales?.sales?.map(sale=>(<option key={sale._id} value={sale._id}>{sale.name}</option>))}

</select>{" "}</h3>
<hr/>
</div>
{leads.status === "loading" && <h2 className="load">Loading...</h2>}
{leads.status === "error" && <h2 className="load">Failed To Fetch Leads Data</h2>}
{leads.status !== "loading" && leads.status !== "error" && sales.status !== "loading" && sales.status !== "error" && salesPerson &&(<>
<div className="filteredLeadsByStatus">
    <div >
    <label><strong>Filter By: </strong></label>{" "}
    <select onChange={handleStatus} value={selectStatus}>
                <option value="">Select a status</option>
                <option value="New">New</option>
<option value="Contacted">Contacted</option>
<option value="Qualified">Qualified</option>
<option value="Proposal Sent">Proposal Sent</option>
<option value="Closed">Closed</option>
            </select>
            {" "}
            <select onChange={handlePriority} value={selectPriority}>

    <option value="">Select Priority</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>

            </select>
            </div>
            <div>
                <labe><strong>Sort By: </strong></labe>
            <select onChange={event=>setTimeSort(event.target.value)} value={timeSort}>
    <option value="">Sort by Time To Close</option>
    <option value="highToLowTime">High to Low Close Time</option>
    <option value="lowToHighTime">Low to High Close Time</option>
</select>
            </div>
            </div>
    <ul>
    {filteredData && filteredData.length > 0 ? (
        filteredData.map(lead => (
          <li key={lead._id} className="leadList">
            <span><Link to={`/viewdetails/${lead._id}`}>{lead.name} [{lead.status}]</Link></span>
            <span className="comment-text">~{lead.salesAgent.name}</span>
          </li>
        ))
      ) : (
        <p className="sec-heading">No Leads Found</p>
      )}
 </ul>
</>)}


<br></br>
{!salesPerson && leads.status!="error" && leads.status !== "loading" && (
  <p className="sec-heading">You need to select any sales agent to view leads data for that agent.</p>
)}
            </div>}
            </div></div>
    </main>
    </>)
}
export default SalesAgentView;