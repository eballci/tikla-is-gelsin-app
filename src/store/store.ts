import {configureStore, createAsyncThunk, createSlice, PayloadAction,} from '@reduxjs/toolkit';
import {Employer, OfferSubmissionStatus, Seeker} from "../model";
import {retrieveUserId, saveUserId} from "../root/persistent";
import {getSeeker} from "../service/seeker.service";
import {getEmployer} from "../service/employer.service";

interface SeekerSlice {
    offerNews: number;
    id: number;
    me: Seeker | null;
    isFetching: boolean;
    isFetchingFailed: boolean;
}

const initialSeekerState: SeekerSlice = {
    offerNews: 0,
    id: retrieveUserId(),
    me: null,
    isFetching: true,
    isFetchingFailed: false,
};

export const fetchSeeker = createAsyncThunk("seeker/fetch", async (invokeAfter: (() => void) | undefined) => {
    await (new Promise((resolve) => {
        setTimeout(() => {
            if (!!invokeAfter) invokeAfter();
            resolve(null);
        }, 1000)
    }));
    const data = await getSeeker(retrieveUserId());
    return data;
});

const seekerSlice = createSlice({
    name: "seeker",
    initialState: initialSeekerState,
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
                state.offerNews = action.payload.offers
                    .filter(offer => offer.status === OfferSubmissionStatus.ISSUED)
                    .length;
            });
    }
});

interface EmployerSlice {
    submissionNews: number;
    id: number;
    me: Employer | null;
    isFetching: boolean;
    isFetchingFailed: boolean;
}

const initialEmployerState: EmployerSlice = {
    submissionNews: 0,
    id: retrieveUserId(),
    me: null,
    isFetching: true,
    isFetchingFailed: false
};

export const fetchEmployer = createAsyncThunk("employer/fetch", async (invokeAfter: (() => void) | undefined) => {
    await (new Promise((resolve) => {
        setTimeout(() => {
            if (!!invokeAfter) invokeAfter();
            resolve(null);
        }, 1000);
    }));
    return await getEmployer(retrieveUserId());
});

const employerSlice = createSlice({
    name: "employer",
    initialState: initialEmployerState,
    reducers: {
        resetSubmissionNews(state) {
            state.submissionNews = 0;
        },
        resetEmployerId(state) {
            state.id = 0;
        },
        setEmployerId(state, action: PayloadAction<number>) {
            state.id = action.payload;
            saveUserId(action.payload);
        },
        resetEmployer(state) {
            state.me = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEmployer.pending, (state) => {
                state.isFetching = true;
                state.isFetchingFailed = false;
            })
            .addCase(fetchEmployer.rejected, (state) => {
                state.isFetching = false;
                state.isFetchingFailed = true;
            })
            .addCase(fetchEmployer.fulfilled, (state, action) => {
                state.isFetching = state.isFetchingFailed = false;
                state.me = action.payload;
                state.submissionNews = action.payload.submissions
                    .filter(submission => submission.status === OfferSubmissionStatus.ISSUED)
                    .length
            });
    }
});

export const store = configureStore({
    reducer: {
        seeker: seekerSlice.reducer,
        employer: employerSlice.reducer
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
export const {
    resetSubmissionNews,
    resetEmployerId,
    setEmployerId,
    resetEmployer
} = employerSlice.actions;