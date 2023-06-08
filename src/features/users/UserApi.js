import { apiSlice } from "../Api/ApiSlice";

export  const UserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (email) => `users?email=${email}`
        })
    })
})

export const { useGetUsersQuery } = UserApi;