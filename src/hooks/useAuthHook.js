import { useDispatch } from "react-redux"
import { userLoggedIn } from "../features/auth/authSlice"
import { useEffect, useState } from "react"

export default function useAuthHook() {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)


    useEffect(() => {    
        const localAuth = localStorage.getItem('auth')
        if (localAuth) {
            const auth = JSON.parse(localAuth)
            
            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user
                }))
            }
            setChecked(true)
        } 
    },[dispatch])
    
    return checked;
}
