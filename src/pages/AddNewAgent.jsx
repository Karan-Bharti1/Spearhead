import { useEffect, useState } from "react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { addNewAgent, fetchSales } from "../features/salesAgents/SalesSlice"
import { useDispatch, useSelector } from "react-redux"
const AddNewAgent=()=>{
    const [agent,setAgent]=useState({
        name:"",
        email:""
    })
    const [message,setMessage]=useState("")
    const sales=useSelector(state=>state.sales)
    console.log(sales)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchSales())
    },[dispatch])
    const handleChange=event=>{
        const {name,value}=event.target
        setAgent(prev=>({...prev,[name]:value}))
    }
    const handleSubmit = event => {
        event.preventDefault()
        
        if(!sales.sales?.some(saleAgent => saleAgent.email === agent.email)) {
            dispatch(addNewAgent(agent))
                .then((result) => {
                    // Check if the action was fulfilled (not rejected)
                    if(!result.error) {
                        setAgent({
                            name: "",
                            email: ""
                        })
                        setMessage("Data Added Successfully")
                    } else {
                        // Handle error from the action itself
                        setMessage("Failed to add agent")
                    }
                    
                    setTimeout(() => {
                        setMessage("")
                    }, 1500)
                })
                .catch((error) => {
                    setMessage("Failed to add agent")
                    setTimeout(() => {
                        setMessage("")
                    }, 1500)
                })
        }
    }

return(<>
<Header text={"Add New Sales Agent"}/>
<main className="container">
    <div className="page-display">
    <div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
        <div className="content">
         <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="text-head"><strong>Agent Name:</strong></label>
                <input type="text" id="name" className="form-control" name="name" value={agent.name} onChange={handleChange} required/>
                <br/><br/>
                <label htmlFor="email" className="text-head"><strong>Email Id:</strong> </label>
                <input type="email" className="form-control"  id="eamil" name="email" value={agent.email} onChange={handleChange} required/>
                <br/>
                {sales.sales?.some(saleAgent=>saleAgent.email===agent.email) && (<p className="errorDisplay">This email Id Already Exists</p>)}
                <br/>
              
                <button className="link-display" type="submit">Submit</button>
            </form>
            <h2>{message}</h2>
           
        </div>
        </div></main></>)
}
export default AddNewAgent