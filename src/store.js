import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "./features/leads/leadSlice";
import { commentSlice } from "./features/comments/CommentSlice";
import { salesSlice } from "./features/salesAgents/SalesSlice";
import { tagSlice } from "./features/tags/tagsSlice";

export default configureStore({reducer:{
    leads:leadSlice.reducer,
    comments:commentSlice.reducer,
    sales:salesSlice.reducer,
    tags:tagSlice.reducer
}})