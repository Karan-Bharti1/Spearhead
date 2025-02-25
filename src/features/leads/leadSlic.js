import { createSlice } from "@reduxjs/toolkit";

 export const leadSlice=createSlice({
    name:"Leads",
    initialState:{
        leads:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{

    }
})
export default leadSlice.reducer