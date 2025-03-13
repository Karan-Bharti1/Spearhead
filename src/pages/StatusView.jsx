import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQueryStringBasedLeadsData } from "../features/leads/leadSlice";
import { fetchSales } from "../features/salesAgents/SalesSlice";
const StatusView=()=>{
    const dispatch=useDispatch()
    const leads=useSelector(state=>state.leads)
    const [data,setData]=useState([])
    const [currentStatus,setCurrentStatus]=useState("")
    const sales=useSelector(state=>state.sales)
    const [salesPerson,setSalesPerson]=useState("")
    const [selectedPriority,setSelectedPriority]=useState("")
    const [timeSort, setTimeSort] = useState("")
    const handleChange = (e) => {
        const status = e.target.value;
        setCurrentStatus(status);
        
        if (status) {
            dispatch(fetchQueryStringBasedLeadsData({
                key: "status",
                value: status
            }));
        }
    };
    useEffect(()=>{
dispatch(fetchSales())
    },[dispatch])
   useEffect(()=>{
    setData(leads.leads)
   },[leads])
   console.log(data)
const filteredData=data?.filter(lead=>{
    const matchesSales=salesPerson===""||lead.salesAgent._id===salesPerson||salesPerson=="All"
    const matchesPriority=selectedPriority===""||selectedPriority==="All"||lead.priority===selectedPriority
    return matchesSales && matchesPriority
})
if(timeSort==="highToLowTime"){
       
   filteredData.sort((a, b) => b.timeToClose - a.timeToClose)

}
if(timeSort==="lowToHighTime"){
    
  filteredData.sort((a, b) => a.timeToClose - b.timeToClose)

}
    return(<>
    <Header text={"Lead Status View"}/>
    <main className="container">
    <div className="page-display">
<div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
       
        <div className="content">
            <div>
            <h3>Select a status:{" "}

            
            <select onChange={handleChange}>
                <option value="">----Select an option to continue----</option>
                <option value="New">New</option>
<option value="Contacted">Contacted</option>
<option value="Qualified">Qualified</option>
<option value="Proposal Sent">Proposal Sent</option>
<option value="Closed">Closed</option>
            </select>
            </h3>
            <hr/>
            
            {leads.status==="loading" && <h2 className="load">Loading...</h2>}
            {leads.status!=="loading"&& currentStatus && data.length > 0 && (<>
                <h3 className="sec-heading">Status: {currentStatus}</h3>
                <div className="filteredLeadsByStatus">
                <div>
                <label><strong>Filters: </strong></label>{" "}
                <select onChange={event=>setSalesPerson(event.target.value)}>
<option value="">Select Sales Agent</option>
<option value="All">All</option>
{sales?.sales?.map(sale=>(<option key={sale._id} value={sale._id}>{sale.name}</option>))}

</select>{" "}
<select onChange={event=>setSelectedPriority(event.target.value)}>
    <option value="">Select Priority</option>
    <option value="All">All</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
</select>
</div>
<div>
<label><strong>Sort By: </strong></label>
<select onChange={event=>setTimeSort(event.target.value)}>
    <option value="">Sort by Time To Close</option>
    <option value="highToLowTime">High to Low Close Time</option>
    <option value="lowToHighTime">Low to High Close Time</option>
</select>
</div>




</div>

                                    <ul>
                                        {filteredData.map(lead => (
                                            <li key={lead._id} className="leadList"><span ><Link to={`/viewdetails/${lead._id}`}>{lead.name} [{lead.status}]</Link></span>
<span className="comment-text">~{lead.salesAgent.name}</span></li>
                                           
                                        ))}
                                        {filteredData.length===0 && <p className="sec-heading">No leads Found</p>}
                                    </ul></>
                                ) }
                                {leads.status!=="loading"&& currentStatus &&  data.length == 0 && <p className="sec-heading">No Leads Found</p>}
                                <br></br>
                             {   !currentStatus && <p className="sec-heading">You need to select any status value to view leads data for that status.</p>}
            </div>
            </div>
            </div>
    </main>
    </>)
}
export default StatusView;