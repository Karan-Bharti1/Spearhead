import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { leadURL } from "../../url";
export const fetchLeads=createAsyncThunk("fetchLeads/Leads",async()=>{
    const response=await axios.get(leadURL)
    return response.data
})
export const fetchQueryStringBasedLeadsData=createAsyncThunk("fetchQueryStringBasedLeads/Leads",async({key,value})=>{
    const response=await axios.get(`${leadURL}?${key}=${value}`)

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
export const editLeadData=createAsyncThunk("editLeads/Leads",async({id,data})=>{
    const response=await axios.put(`${leadURL}/${id}`,data,{
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
builder.addCase(editLeadData.pending,state=>{
    state.status="loading"
})
builder.addCase(editLeadData.fulfilled,(state,action)=>{
    state.status="succeeded"
    const index=state.leads.findIndex(lead=>lead._id===action.payload._id)
    console.log("Before Update:", state.leads[index]);
    if(index!=-1){
state.leads[index]=action.payload
    }   
    console.log("After Update:", state.leads[index]);
})
builder.addCase(editLeadData.rejected,(state,action)=>{
    state.status="error"
    state.error=action.payload
})

builder.addCase(fetchQueryStringBasedLeadsData.pending,state=>{
    state.status="loading"
})
builder.addCase(fetchQueryStringBasedLeadsData.fulfilled,(state,action)=>{
    state.status="succeeded"
    console.log(action.payload)
    state.leads=action.payload
})
builder.addCase(fetchQueryStringBasedLeadsData.rejected,(state,action)=>{
    state.status="error"
    state.error=action.payload
})
    }
})
export default leadSlice.reducer