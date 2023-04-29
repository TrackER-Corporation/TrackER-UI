import { createSlice } from '@reduxjs/toolkit'

const organization = localStorage.getItem("organization")

const initialState = {
    organization: organization ? JSON.parse(organization) : {},
}

export const organizationSlice = createSlice({
    name: 'organization',
    initialState: initialState,
    reducers: {
        fetchOrganization: (state, action) => {
            state.organization = action.payload
            localStorage.setItem("organization", JSON.stringify(action.payload))
        },
    },
})

export const { fetchOrganization } = organizationSlice.actions

export default organizationSlice.reducer