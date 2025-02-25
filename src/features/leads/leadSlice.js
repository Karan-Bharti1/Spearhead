import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { leadURL } from "../../url";
export const fetchLeads=createAsyncThunk("fetchLeads/Leads",async()=>{
    const response=await axios.get(leadURL)
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
    }
})
export default leadSlice.reducer