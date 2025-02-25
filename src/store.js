import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "./features/leads/leadSlice";

export default configureStore({reducer:{
    leads:leadSlice.reducer
}})