import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
};

const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        // Add New Paste 
        addToPaste: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);

            if (index >= 0) {
                toast.error("Toast already Exists ❓");
                return;
            }

            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes))
            toast.success("Pasted created !")
        },

        // Remove specific Paste 
        removeFromPaste: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes))
                toast.success("Pasted removed !")
            }
        },

        // Update specific Paste 
        updatePaste: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);

            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes))
                toast.success("Todo Updated !")
            }
        },

        // Reset whole pastes array 
        resetPastes: (state) => {
            state.pastes = [];
            localStorage.setItem("pastes", JSON.stringify(state.pastes))
        }
    },
});

export const { addToPaste, removeFromPaste, updatePaste } = pasteSlice.actions

export default pasteSlice.reducer
