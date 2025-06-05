import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('favorites')) || [];

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.find(item => item.id === action.payload.id);
            if (!exists) {
                state.push(action.payload);
                localStorage.setItem('favorites', JSON.stringify(state));
            }
        },
        removeFavorite: (state, action) => {
            const updated = state.filter(item => item.id !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(updated));
            return updated;
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
