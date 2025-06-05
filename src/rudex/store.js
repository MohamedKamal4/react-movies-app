import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice.js';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
});