import { configureStore, createSlice } from '@reduxjs/toolkit';

// initial state 
const initialUserState = {
  user: null,
  role: null,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setRole, setLoading } = userSlice.actions;
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;