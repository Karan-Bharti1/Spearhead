import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { salesUrl } from "../../url";
export const fetchSales=createAsyncThunk("fetchSales/sales",async()=>{
    const response=await axios.get(salesUrl)
    return response.data
})
export const salesSlice=createSlice({
    name:"sales",
    initialState:{
        sales:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
builder.addCase(fetchSales.pending,state=>{
    state.status="loading"
})
builder.addCase(fetchSales.fulfilled,(state,action)=>{
    state.status="succeeded"
    state.sales=action.payload
})
builder.addCase(fetchSales.rejected,(state,action)=>{
    state.status="error"
    state.error=action.payload
})
    }
})
export default salesSlice.reducer