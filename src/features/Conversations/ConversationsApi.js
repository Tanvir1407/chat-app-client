import { apiSlice } from "../Api/ApiSlice";

export const ConversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) => `conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_CONVERSATIONS_PER_PAGE}`
        }),
        getConversation: builder.query({
            query: ({userEmail,participantEmail} ) => `conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`
        }),
        addConversation: builder.mutation({
            query: (data) => ({
                url: "conversations",
                method: "POST",
                body: data
            }) 
        }),
        editConversation: builder.mutation({
            query: ({data,id}) => ({
                url: `conversations/${id}`,
                method: "PATCH",
                body: data
            }) 
        }),
    })
})


export const { useGetConversationsQuery , useGetConversationQuery, useAddConversationMutation, useEditConversationMutation} = ConversationsApi;