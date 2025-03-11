import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Organization } from "../types/organizations";
import api from "../config/axios";

interface OrganizationsState {
  list: Organization[];
  selectedOrganization: Organization | null;
  loading: boolean;
  error: string | undefined;
}

export const getOrganizations = createAsyncThunk(
  "organizations/getOrganizations",
  async () => {
    const response = await api.get("/organizations");
    return response.data.data;
  }
);

export const getOrganizationById = createAsyncThunk(
  "organizations/getOrganizationById",
  async (organizationId: string) => {
    const response = await api.get(`/organizations/${organizationId}`);
    return response.data.data;
  }
);

export const updateOrganization = createAsyncThunk(
  "organizations/updateOrganization",
  async (updatedOrganization: Organization) => {
    // Extraer _id y usar el resto de los datos para el body
    const { _id, ...updateData } = updatedOrganization;
    const response = await api.patch(`/organizations/${_id}`, updateData);
    return response.data.data;
  }
);

// Thunk para crear una organización
export const createOrganization = createAsyncThunk(
  "organizations/createOrganization",
  async (newOrganization: Partial<Organization>) => {
    const response = await api.post(`/organizations`, newOrganization);
    return response.data.data;
  }
);

// Thunk para eliminar una organización
export const deleteOrganization = createAsyncThunk(
  "organizations/deleteOrganization",
  async (organizationId: string) => {
    await api.delete(`/organizations/${organizationId}`);
    return organizationId;
  }
);

const initialState: OrganizationsState = {
  list: [],
  selectedOrganization: null,
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Cases for getOrganizations
      .addCase(getOrganizations.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.loading = initialState.loading;
        state.list = action.payload;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.loading = initialState.loading;
        state.list = initialState.list;
        state.error = action.error.message;
      })

      // Cases for getOrganizationById
      .addCase(getOrganizationById.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getOrganizationById.fulfilled, (state, action) => {
        state.loading = initialState.loading;
        state.selectedOrganization = action.payload;
      })
      .addCase(getOrganizationById.rejected, (state, action) => {
        state.loading = initialState.loading;
        state.selectedOrganization = null; // Limpiar el valor en caso de error
        state.error = action.error.message;
      })
      // Casos para updateOrganization
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrganization = action.payload;
        // Opcional: actualizar también la lista si es necesario
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Casos para createOrganization
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrganization = action.payload;
        // Opcional: agregar la nueva organización a la lista
        state.list.push(action.payload);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Casos para deleteOrganization
      .addCase(deleteOrganization.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.loading = false;
        // Si eliminamos la organización seleccionada, limpiamos el valor
        if (
          state.selectedOrganization &&
          state.selectedOrganization._id === action.payload
        ) {
          state.selectedOrganization = null;
        }
        // Opcional: eliminar de la lista
        state.list = state.list.filter((org) => org._id !== action.payload);
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;

export default reducer;
