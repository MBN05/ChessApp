import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchPlayers = createAsyncThunk("players/fetchPlayers", async () => {
  const res = await api.get("/players");
  return res.data;
});

export const addPlayer = createAsyncThunk("players/addPlayer", async (player) => {
  const res = await api.post("/players", player);
  return res.data;
});

export const updatePlayer = createAsyncThunk("players/updatePlayer", async ({id, data}) => {
  const res = await api.put(`/players/${id}`, data);
  return res.data;
});

export const deletePlayer = createAsyncThunk("players/deletePlayer", async (id) => {
  await api.delete(`/players/${id}`);
  return id;
});

const playerSlice = createSlice({
  name: "players",
  initialState: {
    list: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p._id !== action.payload);
      });
  },
});

export default playerSlice.reducer;
