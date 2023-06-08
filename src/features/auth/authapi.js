import { apiSlice } from "../Api/ApiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data
            }),

            async onQueryStarted(arg, {queryFulfilled,dispatch}) {
                try {
                    const result = await queryFulfilled;
                    console.log(result.data)
                    //local storage e user er info set kora holo
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }))
                    
                    // redux store user info set kora holo
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }))

                } catch(err) {
                    console.log(err)
                }
            }
            
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            }),
            
            async onQueryStarted(arg, {queryFulfilled,dispatch}) {
                try {
                    const result = await queryFulfilled;
                
                    //local storage e user er info set kora holo
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }))

                    // redux store user info set kora holo
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }))

                } catch(err) {
                    console.log(err)
                }
            }
        })
    })
})

export const {useRegisterMutation, useLoginMutation} = authApi