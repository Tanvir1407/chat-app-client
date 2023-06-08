import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/Api/ApiSlice";
import authSlice from "../features/auth/authSlice";
import ConversationsSlice from "../features/Conversations/ConversationsSlice";
import MessageSlice from "../features/Messages/MessageSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        conversations: ConversationsSlice,
        message: MessageSlice,
    },
    // devTools: import.meta.env.DEV == true,
    middleware: (getDefaultMiddlewares)=> getDefaultMiddlewares().concat(apiSlice.middleware)

})
