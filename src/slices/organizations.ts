import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Organization } from "../types/organizations";
import api from "../config/axios";

interface OrganizationsState {
    list: Organization[],
    loading: boolean,
    error: string | undefined
}

export const getOrganizations = createAsyncThunk(
    'organizations/getOrganizations',
    async () => {
        const response = await api.get('/organizations');
        return response.data.data;
    }
)

const initialState: OrganizationsState = {
    list:[],
    loading: false,
    error: undefined
} 

const slice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getOrganizations.pending, (state) => {
                state.loading = true
                state.error = initialState.error
            })
            .addCase(getOrganizations.fulfilled, (state, action) => {
                state.loading = initialState.loading
                state.list = action.payload

            })
            .addCase(getOrganizations.rejected, (state, action) => {
                state.loading = initialState.loading
                state.list = initialState.list
                state.error = action.error.message
            })
    }
})

export const reducer = slice.reducer;

export default reducer;