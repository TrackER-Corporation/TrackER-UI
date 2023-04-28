import { createSlice } from '@reduxjs/toolkit'


const user = localStorage.getItem("allOrganization");

const initialState = {
    user: user ? JSON.parse(user) : {},
}

export const allUserSlice = createSlice({
    name: 'allUser',
    initialState: initialState,
    reducers: {
        setAllUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("allUser", JSON.stringify(action.payload))
        },
    },
})

export const { setAllUser } = allUserSlice.actions

export default allUserSlice.reducer