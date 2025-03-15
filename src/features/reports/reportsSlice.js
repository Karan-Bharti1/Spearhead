import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reportsClosedLastWeekUrl } from "../../url";
export const getLastWeekClosedLeadsData=createAsyncThunk("featchLastWeekLeads/reports",async()=>{
    const response=await axios.get(reportsClosedLastWeekUrl)
    console.log(response.data)
    return response.data
})
 export const reportSlice=createSlice({
    name:"Reports",
    initialState:{
        leads:[],
        status:"idle",
        error:null
    },
    reducer:{},
    extraReducers:builder=>{
builder.addCase(getLastWeekClosedLeadsData.pending,state=>{
    state.status==="loading"
})
builder.addCase(getLastWeekClosedLeadsData.fulfilled,(state,action)=>{
    state.status="succeeded"
    state.leads=action.payload
})
builder.addCase(getLastWeekClosedLeadsData.rejected,(state,action)=>{
    state.status="error"
    state.error=action.payload
})
    }
})
export default reportSlice.reducer