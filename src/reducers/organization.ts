import { createSlice } from '@reduxjs/toolkit'
import { Organization } from '../types'

const organization = localStorage.getItem("organization")

interface InitState {
    organization: Organization
}

const initialState: InitState = {
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