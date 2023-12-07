import { configureStore } from "@reduxjs/toolkit";
import actionSlice from "./slice/allSlice";
import todoslice from "./slice/todoslice";
import filterSlice from "./slice/filterSlice";
import noteSlice from "./slice/noteSlice";

export const store=configureStore({
    reducer: {
        'actions': actionSlice,
        'todos':todoslice,
        'filter':filterSlice,
        'notes':noteSlice,
      },      
})
