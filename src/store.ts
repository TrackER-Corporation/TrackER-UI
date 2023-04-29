import { configureStore } from '@reduxjs/toolkit'
import { allOrganizationSlice } from './reducers/allOrganization'
import { allUserSlice } from './reducers/allUsers'
import { buildingsSlice } from './reducers/buildings'
import { organizationSlice } from './reducers/organization'
import { preferenceSlice } from './reducers/preference'
import { userSlice } from './reducers/user'


export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    preference: preferenceSlice.reducer,
    buildings: buildingsSlice.reducer,
    organization: organizationSlice.reducer,
    allOrganization: allOrganizationSlice.reducer,
    allUser: allUserSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch