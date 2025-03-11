import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/users";
import api from "../config/axios";

interface UsersState {
  list: User[];
  loading: boolean;
  error: string | undefined;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: undefined,
};

// Obtener todos los usuarios
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await api.get("/users");
  return response.data.data;
});

// Crear un nuevo usuario
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: unknown) => {
    console.log("In Redux thunk, sending:", userData);
    const response = await api.post("/users/", userData);
    return response.data.data;
  }
);

// Actualizar un usuario existente
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }: { id: string; userData: Partial<User> }) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data.data;
  }
);

// Eliminar un usuario
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    await api.delete(`/users/${id}`);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener usuarios
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Crear usuario
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    /*       // Actualizar usuario
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) */

    /*       // Eliminar usuario
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }); */
  },
});

export const reducer = usersSlice.reducer;

export default reducer;
