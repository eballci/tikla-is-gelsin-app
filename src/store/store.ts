import {configureStore, createSlice, PayloadAction,} from '@reduxjs/toolkit';

interface SeekerSlice {
    offerNews: number;
}

const initialState: SeekerSlice = {
    offerNews: 0,
};

const seekerSlice = createSlice({
    name: "seeker",
    initialState,
    reducers: {
        resetOfferNews(state) {
            state.offerNews = 0;
        },
        addAmountToOfferNews(state, action: PayloadAction<number>) {
            state.offerNews += action.payload;
        },
    }
});

export const store = configureStore({
    reducer: seekerSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const {
    resetOfferNews,
    addAmountToOfferNews,
} = seekerSlice.actions;