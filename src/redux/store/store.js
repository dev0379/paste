import { configureStore } from '@reduxjs/toolkit';
import pasteSlice from "../features/pasteSlice"


export const store = configureStore({
    reducer: {
        paste: pasteSlice,
    }
});


