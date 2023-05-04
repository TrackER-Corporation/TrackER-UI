import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types';


const user = localStorage.getItem("user");
const logged = localStorage.getItem("logged");


const initialState: User = {
    user: user ? JSON.parse(user) : {},
    logged: logged === "true"
}


export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.logged = true
            localStorage.setItem("user", JSON.stringify(action.payload))
            localStorage.setItem("logged", "true")
        },
        logout: (state) => {
            state.user = initialState.user
            state.logged = false
            localStorage.setItem("logged", "false")
            localStorage.setItem("user", JSON.stringify(initialState.user))
            localStorage.removeItem("preference")
            localStorage.removeItem("buildings")
            localStorage.removeItem("organization")
        },
        updateUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
    },
})

export const { login, logout, updateUser } = userSlice.actions

export default userSlice.reducer