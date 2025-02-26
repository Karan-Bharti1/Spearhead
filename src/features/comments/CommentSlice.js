import { createSlice } from "@reduxjs/toolkit";

export const commentSlice=createSlice({
    name:"comments",
    initialState:{
        comments:[],
        status:"idle",
        error:null
        
    },
    reducers:{},
    extraReducers:(builder)=>{
        
    }
})
export default commentSlice.reducer