import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLeads } from "../features/leads/leadSlice";
import { Link } from "react-router-dom";
import { addComment, fetchComments } from "../features/comments/CommentSlice";
const ViewDetail=()=>{
    const {id}=useParams()
    const dispatch=useDispatch()
    const [leadData,setLeadData]=useState({})
    const [commentsData,setCommentsData]=useState([])
    const {leads:state,comments}=useSelector(state=>state)
    const [commentText,setCommentText]=useState("")
    console.log(comments)
    useEffect(()=>{
        dispatch(fetchLeads())
        dispatch(fetchComments(id))
    },[id,dispatch])
    useEffect(()=>{
const required=state.leads?.find(lead=>lead._id===id)
setLeadData(required)

    },[state.leads,id])
    useEffect(()=>{
setCommentsData(comments.comments)
    },[comments.comments])
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addComment({id, data: {commentText: commentText}}))
            .then(() => {
                setCommentText("");
            });
    }
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
                <Link className="link-display" to={`/editlead/${id}`}>Edit Details</Link>
            </div>
            <div>
                <p className="sec-heading">Comment Box</p>
                <div className="comment-container">
                    <form onClick={handleSubmit}>
                        <textarea  value={commentText} onChange={event=>setCommentText(event.target.value)} className="form-control" placeholder="Add a comment for the lead....." rows={10} required></textarea>
                        <button className="link-display" type="submit">Submit</button>
                    </form>
                </div>
               
            </div>
          {commentsData.length>0&&   (<div className="display-comment">
            <p className="sec-heading">Recent Comments</p>
                    {commentsData.map(comment=> (<div className="comment-box" key={comment._id}>
                        <div className="comment-box-author-time">
                        <p className="comment-text-profile">{comment.author.name}</p>
                        <p className="comment-text">{new Date(comment.createdAt).toLocaleString()}</p>
                        </div>
                         <p ><span className="text-head"><strong>Remarks:</strong></span> {comment.commentText}</p>
                         </div>)
                    )}
                </div>)}
                {
                  comments.status!="loading" &&  commentsData.length==0 && <p className="sec-heading">No comments available. </p>
                }
           </>)}
        </div>
    </div>
    </main>
    </>)
}
export default ViewDetail;