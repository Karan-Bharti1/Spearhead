import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header"
import { useEffect } from "react";
import { fetchSales } from "../features/salesAgents/SalesSlice";
import { Link } from "react-router-dom";
const SalesAgent=()=>
    {
        const salesAgents=useSelector(state=>state.sales)
        console.log(salesAgents)
        const dispatch=useDispatch()
        useEffect(()=>{
            dispatch(fetchSales())
        },[dispatch])
    return(<>
    <Header text={"Sales Agents"}/>
    <main className="container">
    <div className="page-display">
<div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
       
        <div className="content">
            {salesAgents.status==="loading"&&(<>
                <h2 className="load">Loading...</h2></>)}
                {(salesAgents.status=="error") && (<>
                <h2 className="load">Failed to fetch agents Data</h2>
                </>)}
        {salesAgents.status!=="loading" && salesAgents.status!="error" &&<><div className="addAgentContainer">
                <Link className="link-display" to={"/addagent"}>Add New Agent</Link>
            </div>
        <ul>
        {salesAgents?.sales?.map(agent=>(<li key={agent._id} className="leadList"><span >{agent.name}</span>
<span className="comment-text">{agent.email}</span></li>))}
</ul></>}
        </div>
        </div>
    </main>
    </>)
}
export default SalesAgent;