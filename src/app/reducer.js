import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    BookMark: [
      {
        name: "",
        id: "",
      },
    ],
  },
  reducers: {
    setBookMarkData: (state, action) => {
      state.BookMark.push(action.payload);
    },
  },
});
export const { setBookMarkData } = appSlice.actions;
export default appSlice.reducer;
