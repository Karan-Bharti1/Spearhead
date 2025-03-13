import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQueryStringBasedLeadsData } from "../features/leads/leadSlice";
const StatusView=()=>{
    const dispatch=useDispatch()
    const leads=useSelector(state=>state.leads)
    const [data,setData]=useState([])
    const [currentStatus,setCurrentStatus]=useState("")

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
    setData(leads.leads)
   },[leads])

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
            <h3>Select a status to see leads for that status:{" "}

            
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
            <h3 className="sec-heading">{currentStatus}</h3>
            {leads.status==="loading" && <h2 className="load">Loading...</h2>}
            {leads.status!=="loading"&& currentStatus && data.length > 0 && (
                                    <ul>
                                        {data.map(lead => (
                                            <li key={lead._id } className="leadList">
                                                {lead.name} 
                                            </li>
                                        ))}
                                    </ul>
                                ) }
                                {leads.status!=="loading"&& currentStatus &&  data.length == 0 && <p className="sec-heading">No Leads Found</p>}
                                <br></br>
                             {   !currentStatus && <p className="sec-heading">You need to select any status value to view leads data for that stataus</p>}
            </div>
            </div>
            </div>
    </main>
    </>)
}
export default StatusView;