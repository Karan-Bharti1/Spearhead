import Header from "../components/Header";
import { Link } from "react-router-dom";
const SalesAgentView=()=>{
    return(<>
    <Header text={"Sales Agent View"}/>
    <main className="container">
    <div className="page-display">
<div className="sidebar">
            <h2  className='sidebar-text'>Back to Dashboard</h2>
        <Link className='btn-primary' to="/">Dashboard</Link>
        </div>
       
        <div className="content">
            </div>
            </div>
    </main>
    </>)
}
export default SalesAgentView;