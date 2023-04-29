
import { createSlice } from '@reduxjs/toolkit'

const preference = localStorage.getItem("preference")

const initialState = {
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