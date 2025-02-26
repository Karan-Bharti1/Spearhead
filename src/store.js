import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "./features/leads/leadSlice";
import { commentSlice } from "./features/comments/CommentSlice";

export default configureStore({reducer:{
    leads:leadSlice.reducer,
    comments:commentSlice.reducer
}})