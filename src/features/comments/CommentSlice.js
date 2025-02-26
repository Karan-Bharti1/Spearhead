import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { leadURL } from "../../url";
export const fetchComments=createAsyncThunk("fetchComments/comments",async(id)=>{
    const response= await axios.get(`${leadURL}/${id}/comments`)
    
    return response.data
})
export const addComment=createAsyncThunk("addComment/comments",async({id,data})=>{
    const response= await axios.post(`${leadURL}/${id}/comments`,data,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        }
    })
    return response.data
})
export const commentSlice=createSlice({
    name:"comments",
    initialState:{
        comments:[],
        status:"idle",
        error:null
        
    },
    reducers:{},
    extraReducers:(builder)=>{
builder.addCase(fetchComments.pending,state=>{
    state.status="loading"
})
builder.addCase(fetchComments.fulfilled,(state,action)=>{
    state.status="succeeded"
    state.comments=action.payload
    
})
builder.addCase(fetchComments.rejected,(state,action)=>{
    state.status="error"
    state.status=action.payload
})
builder.addCase(addComment.pending,state=>{
    state.status="loading"
})
builder.addCase(addComment.fulfilled,(state,action)=>{
    state.status="succeeded"
    state.comments.push(action.payload)
})
builder.addCase(addComment.rejected,(state,action)=>{
    state.status="error"
    state.status=action.payload
})
    }
})
export default commentSlice.reducer