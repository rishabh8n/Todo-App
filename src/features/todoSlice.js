import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

console.log(data);

export const todoSlice = createSlice({
  name: "todo",
  initialState: data,
  reducers: {},
});

export default todoSlice.reducer;
