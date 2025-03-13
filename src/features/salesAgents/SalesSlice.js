import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { salesUrl } from "../../url";
export const fetchSales=createAsyncThunk("fetchSales/sales",async()=>{
    const response=await axios.get(salesUrl)
    return response.data
})

export const addNewAgent = createAsyncThunk("addNewAgent/sales", async(agent) => {
    try {
        // Direct string URL, properly formatted request
        const response = await axios.post(salesUrl, agent, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        throw error;
    }
});
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
builder.addCase(addNewAgent.pending,state=>{
    state.status="loading"
    
})
builder.addCase(addNewAgent.fulfilled,(state,action)=>{
    state.status="succeeded"
    console.log(action.payload)
    state.sales.push(action.payload)
})
builder.addCase(addNewAgent.rejected,(state,action)=>{
    state.status="error"
    state.error=action.payload
})
    }
})
export default salesSlice.reducer