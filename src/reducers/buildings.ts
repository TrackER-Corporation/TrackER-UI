import { createSlice } from '@reduxjs/toolkit'
import { Building } from '../types'


const buildings = localStorage.getItem("buildings")

interface InitState {
    buildings: Array<Building>
}

const initialState: InitState = {
    buildings: buildings ? JSON.parse(buildings) : {},
}


export const buildingsSlice = createSlice({
    name: 'buildings',
    initialState: initialState,
    reducers: {
        fetchBuildings: (state, action) => {
            state.buildings = action.payload
            localStorage.setItem("buildings", JSON.stringify(action.payload))
        },
    },
})

export const { fetchBuildings } = buildingsSlice.actions

export default buildingsSlice.reducer