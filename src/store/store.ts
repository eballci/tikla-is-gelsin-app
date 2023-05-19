import {configureStore, createSlice, PayloadAction,} from '@reduxjs/toolkit';
import {Seeker} from "../model";

interface SeekerSlice {
    offerNews: number;
    id: number;
    me: Seeker | null;
    isFetching: boolean;
}

const initialState: SeekerSlice = {
    offerNews: 0,
    id: 0,
    me: null,
    isFetching: true
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
        resetSeekerId(state) {
            state.id = 0;
        },
        setSeekerId(state, action: PayloadAction<number>) {
            state.id = action.payload;
        },
        resetSeeker(state) {
            state.me = null;
        },
        setSeeker(state, action: PayloadAction<Seeker>) {
            state.me = action.payload;
        },
        makeSeekerFetching(state) {
            state.isFetching = true;
        },
        makeSeekerNoFetching(state) {
            state.isFetching = false;
        }
    }
});

export const store = configureStore({
    reducer: {
        seeker: seekerSlice.reducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const {
    resetOfferNews,
    addAmountToOfferNews,
    resetSeekerId,
    setSeekerId,
    resetSeeker,
    setSeeker,
    makeSeekerFetching,
    makeSeekerNoFetching
} = seekerSlice.actions;