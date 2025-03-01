import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { leadURL } from "../../url";
export const fetchLeads=createAsyncThunk("fetchLeads/Leads",async()=>{
    const response=await axios.get(leadURL)
    return response.data
})
export const addLead=createAsyncThunk("addLeads/leads",async(data)=>{
    const response=await axios.post(leadURL,data,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    })
    return response.data
})
 export const leadSlice=createSlice({
    name:"Leads",
    initialState:{
        leads:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
builder.addCase(fetchLeads.pending,state=>{
    state.status="loading"
})
builder.addCase(fetchLeads.fulfilled,(state,action)=>{
    state.status="succeeded"
    state.leads=action.payload
})
builder.addCase(fetchLeads.rejected,(state,action)=>{
    state.status="error"
    state.error=action.payload
})
builder.addCase(addLead.pending,state=>{
    state.status="loading"
})
builder.addCase(addLead.fulfilled,(state,action)=>{
    state.status="succeeded"
    state.leads.push(action.payload)
})
builder.addCase(addLead.rejected,(state,action)=>{
    state.status="error"
    state.error=action.payload
})
    }
})
export default leadSlice.reducer