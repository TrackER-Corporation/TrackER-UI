
import { createSlice } from '@reduxjs/toolkit'
import { UserPreference } from '../types'

const preference = localStorage.getItem("preference")

interface initState {
    preference: UserPreference
}

const initialState: initState = {
    preference: preference ? JSON.parse(preference) : {},
}


export const preferenceSlice = createSlice({
    name: 'preference',
    initialState: initialState,
    reducers: {
        userPreference: (state, action) => {
            state.preference = action.payload
            localStorage.setItem("preference", JSON.stringify(action.payload))
        },
        updatePreference: (state, action) => {
            state.preference = action.payload
            localStorage.setItem("preference", JSON.stringify(action.payload))
        }
    },
})

export const { userPreference, updatePreference } = preferenceSlice.actions

export default preferenceSlice.reducer