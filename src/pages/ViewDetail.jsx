import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLeads } from "../features/leads/leadSlice";
import { Link } from "react-router-dom";
const ViewDetail=()=>{
    const {id}=useParams()
    const dispatch=useDispatch()
    const [leadData,setLeadData]=useState({})
    const state=useSelector(state=>state.leads)
    useEffect(()=>{
        dispatch(fetchLeads())
    },[])
    useEffect(()=>{
const required=state.leads?.find(lead=>lead._id===id)
setLeadData(required)
console.log(leadData)
    },[state.leads.length>0,leadData])
    return(<>
    <Header text={"Lead Details"}/>
   
    <main className='container'>
    <div className="page-display">
        <div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        <div className="content">
        {state.status==="loading" && (<>
            <h2 className="load">Loading...</h2></>)}
           {state.status==="succeeded" && (<>
            <p className="main-heading">{leadData?.name}</p>
            <div className="content-container">
            <div className="lead-content">
                <p><strong><span className="text-head">Source: </span></strong>{leadData?.source}</p>
                <p><strong><span className="text-head">Tags: </span></strong>{leadData?.tags?.map((tag)=><span className="tag" key={tag._id}>{tag.name}</span>)}</p>
                
                <p><strong><span className="text-head">Status: </span></strong>{leadData?.status}</p>
                <p><strong><span className="text-head">Time To Close: </span></strong>{leadData?.timeToClose}</p>
                <p><strong><span className="text-head">Priority: </span></strong>{leadData?.priority}</p>
                {leadData?.closedAt &&  <p><strong><span className="text-head">Closed At: </span></strong>{leadData?.closedAt.split("T").map(data=>data).join(", ")}</p>}
            </div>
            <div className="sales-content">
               <p className="sec-heading">Sales Agent</p>
               <p><strong><span className="text-head">Name: </span></strong> {leadData?.salesAgent?.name}</p>
               <p><strong><span className="text-head">E-mail: </span> </strong>{leadData?.salesAgent?.email}</p>
            </div>
            </div>
            <div className="edit-container">
                <Link className="link-display">Edit Details</Link>
            </div>
            <div>
                <p className="sec-heading">Comment Box</p>
                <div className="comment-container">
                    <form>
                        <textarea className="form-control" placeholder="Add a comment for the lead....." rows={10}></textarea>
                    </form>
                </div>
            </div>
           </>)}
        </div>
    </div>
    </main>
    </>)
}
export default ViewDetail;