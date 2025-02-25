import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "./features/leads/leadSlic";

export default configureStore({reducer:{
    leads:leadSlice.reducer
}})