import Header from "../components/Header";
import {  Link } from "react-router-dom";
import { Chart as ChartJs,Legend,Tooltip,ArcElement,CategoryScale,LinearScale,BarElement,Title } from "chart.js";
import { Pie,Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../features/leads/leadSlice";
import { fetchSales } from "../features/salesAgents/SalesSlice";
import { getLastWeekClosedLeadsData } from "../features/reports/reportsSlice";
ChartJs.register(Legend,Tooltip,ArcElement,CategoryScale,LinearScale,BarElement,Title)
const Reports=()=>{
    const leads=useSelector(state=>state.leads)
   const sales=useSelector(state=>state.sales)
   const leadsClosedLastWeek=useSelector(state=>state.reports)
    const [leadsData,setLeadsData]=useState([])
    const [salesAgent,setSalesAgent]=useState([])
    const dispatch=useDispatch()
    useEffect(()=>{
dispatch(fetchLeads())
dispatch(fetchSales())
dispatch(getLastWeekClosedLeadsData())
    },[dispatch])
    useEffect(()=>{
setLeadsData(leads.leads)
setSalesAgent(sales.sales)
    },[leads.leads,sales.sales])
const closedLeads=leadsData?.filter(lead=>lead.status==="Closed")
const numberOfClosedLeads=closedLeads.length
const inPipeLineLeads=leadsData.length-numberOfClosedLeads

    const pieChartData={
        labels:["Closed Leads","In Pipeline"],
        datasets:[{
            label:"Total Number",
            data:[numberOfClosedLeads,inPipeLineLeads],
            backgroundColor:[  "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)"],
                hoverOffset: 4,
            }]}
     
    const options={
        responsive:true,
        plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
          
          }
    }
  
   const salesLeadsAgentCounts=leadsData?.reduce((acc,curr)=>{
const agentId=curr.salesAgent._id
if(!acc[agentId]){
    acc[agentId]={name:curr.salesAgent.name,count:0}
}
acc[agentId].count+=1
return acc
   },{})
 const valuesArray=salesLeadsAgentCounts?Object.values(salesLeadsAgentCounts):[]
   const salesAgentArray=valuesArray?.map(lead=>lead.name)
   const countArray=valuesArray?.map(lead=>lead.count)

   const barChartData={
    labels:salesAgentArray,
    datasets:[{
label:"Number of leads Assigned",
data:countArray,
maintainAspectRatio: false,
backgroundColor: ["rgba(255, 99, 132, 0.2)"],
borderColor: ["rgba(54, 162, 235, 1)"],
borderWidth:1
    }]
  }
  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          text: 'Number of Leads'
        }
      },
      x: {
        title: {
          text: 'Sales Agents'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
    
    }
  };

  const salesLeadsAgentCountsClosed=closedLeads?.reduce((acc,curr)=>{
    const agentId=curr.salesAgent._id
    if(!acc[agentId]){
        acc[agentId]={name:curr.salesAgent.name,count:0}
    }
    acc[agentId].count+=1
    return acc
       },{})

     const valuesArrayClosed=salesLeadsAgentCountsClosed?Object.values(salesLeadsAgentCountsClosed):[]
     
       const salesAgentArrayClosed=valuesArrayClosed?.map(lead=>lead.name)
       const countArrayClosed=valuesArrayClosed?.map(lead=>lead.count)
       const barChartDataClosedLeads={
        labels:salesAgentArrayClosed,
        datasets:[{
    label:"Number of leads closed",
    data:countArrayClosed,
    maintainAspectRatio: false,
    backgroundColor: ["rgba(255, 99, 132, 0.2)"],
    borderColor: ["rgba(54, 162, 235, 1)"],
    borderWidth:1
        }]
      }
       const PieChart=({data})=>{
    return(<>
    <Pie options={options} data={data}/></>)
}
const BarChart=({data})=>{
    return(<>
    <Bar options={barOptions} data={data}/></>)
}
const newLeads=leadsData?.filter(lead=>lead.status==="New")
const contactedLeads=leadsData?.filter(lead=>lead.status==="Contacted")
const qualifiedLeads=leadsData?.filter(lead=>lead.status==="Qualified")
const proposalSentLeads=leadsData?.filter(lead=>lead.status==="Proposal Sent")
const pieChartDataStatus={
    labels:["New","Contacted","Qualified","Proposal Sent","Closed"],
    datasets:[{
        label:"Total Number of Leads",
        data:[newLeads.length,contactedLeads.length,qualifiedLeads.length,proposalSentLeads.length,closedLeads.length],
        backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          hoverOffset: 4,
        }]}
 
    return (<>
<Header text={"Reports"}/>
<main className="container">
<div className="page-display">
<div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        <div className="content" >
          
            {(leads.status=="loading" ||sales.status=="loading" ) && (<>
                <h2 className="load">Loading...</h2>
                </>)}
                {(leads.status==="error" ||sales.status==="error" || leadsClosedLastWeek.status==="error") && (<>
                <h2 className="load">Failed to fetch reports data</h2>
                </>)}
        {
            leads.status!=="loading" && sales.status!=="loading" && leadsClosedLastWeek.status!=="loading"&& leads.status!="error"&&sales.status!="error"  && (<>
             <h2 className="main-heading">Reports Overview</h2>
             <h2 className="sec-heading">Total Leads closed and in Pipeline</h2>
            <div className="chart-container">
                <div>
                    <p className="ter-heading">Total Leads: {leadsData.length}</p>
                    <p className="ter-heading">Closed Leads: {numberOfClosedLeads}</p>
                    <p className="ter-heading"> Leads In Pipeline: {inPipeLineLeads}</p>
                </div>
                <div>
                <PieChart data={pieChartData}/>
                </div>
            </div>
            <h2 className="sec-heading">Leads Assigned to all Sales Agents</h2>
        <div className="chart-container">
                <div>
                    <p className="ter-heading">Total Sales Agents: {salesAgent.length}</p>
                    <p className="ter-heading">Total Agents with leads Assigned: {salesAgentArray.length}</p>
               <p className="ter-heading">Total agents with no leads assigned : {salesAgent.length-salesAgentArray.length}</p>
                </div>
                <div >
                <BarChart data={barChartData}/>
                </div>
            </div>
            
        <div className="chart-container">
        <div >
                <h2 className="sec-heading">Leads Closed by Sales Agent</h2>
                <BarChart data={barChartDataClosedLeads}/>
                </div>
                <div>
                <h2 className="sec-heading">Lead Status Distribution</h2>
                <PieChart data={pieChartDataStatus}/>
                 
                </div>
              
            </div>
           <h2 className="sec-heading">Leads Closed Last Week</h2>
           <ul>
           {leadsClosedLastWeek?.leads?.map(lead=>(<li key={lead._id} className="leadList"><span >{lead.name} </span>
            <span className="comment-text">~{lead.salesAgent}</span></li>))}
           </ul>
           {leadsClosedLastWeek?.leads.length==0 && <h2  className="sec-heading">No Leads Found</h2>}
            </>)
        }
            </div></div>
</main>
    </>)
}
export default Reports