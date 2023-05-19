import {configureStore, createAsyncThunk, createSlice, PayloadAction,} from '@reduxjs/toolkit';
import {Seeker} from "../model";
import {retrieveUserId, saveUserId} from "../root/persistent";
import {getSeeker} from "../service/seeker.service";

interface SeekerSlice {
    offerNews: number;
    id: number;
    me: Seeker | null;
    isFetching: boolean;
    isFetchingFailed: boolean;
}

const initialState: SeekerSlice = {
    offerNews: 0,
    id: retrieveUserId(),
    me: null,
    isFetching: true,
    isFetchingFailed: false,
};

export const fetchSeeker = createAsyncThunk("seeker/fetch", async (invokeAfter: (() => void) | undefined) => {
    const data = await getSeeker(retrieveUserId());
    await (new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 1000)
    }));
    if (!!invokeAfter) invokeAfter();
    return data;
});

const seekerSlice = createSlice({
    name: "seeker",
    initialState,
    reducers: {
        resetOfferNews(state) {
            state.offerNews = 0;
        },
        resetSeekerId(state) {
            state.id = 0;
        },
        setSeekerId(state, action: PayloadAction<number>) {
            state.id = action.payload;
            saveUserId(action.payload);
        },
        resetSeeker(state) {
            state.me = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchSeeker.pending, (state) => {
                state.isFetching = true;
                state.isFetchingFailed = false;
            })
            .addCase(fetchSeeker.rejected, (state) => {
                state.isFetching = false;
                state.isFetchingFailed = true;
            })
            .addCase(fetchSeeker.fulfilled, (state, action) => {
                state.isFetching = state.isFetchingFailed = false;
                state.me = action.payload;
            });
    }
});

export const store = configureStore({
    reducer: {
        seeker: seekerSlice.reducer
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: false,
        })
    )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const {
    resetOfferNews,
    resetSeekerId,
    setSeekerId,
    resetSeeker,
} = seekerSlice.actions;