import { createSlice } from '@reduxjs/toolkit'

const organizationData = localStorage.getItem("allOrganization");
const allBuildingsData = localStorage.getItem("allBuildings");

const initialState = {
    organization: organizationData ? JSON.parse(organizationData) : null,
    allBuildings: allBuildingsData ? JSON.parse(allBuildingsData) : null
};

export const allOrganizationSlice = createSlice({
    name: 'allOrganization',
    initialState: initialState,
    reducers: {
        setAllOrganization: (state, action) => {
            state.organization = action.payload
            localStorage.setItem("allOrganization", JSON.stringify(action.payload))
        },
        setAllBuildings: (state, action) => {
            state.allBuildings = action.payload
            localStorage.setItem("allBuildings", JSON.stringify(action.payload))
        },
    },
})

export const { setAllOrganization, setAllBuildings } = allOrganizationSlice.actions

export default allOrganizationSlice.reducer