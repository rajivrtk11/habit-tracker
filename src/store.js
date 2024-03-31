import { createSlice, configureStore } from '@reduxjs/toolkit';

// Define initial state for products
const initialProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Define initial state for users
const initialUsersState = {
  users: [],
  loading: false,
  error: null,
};

// Create a slice for products
const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    // Define reducers for updating products state
    setProducts(state, action) {
        console.log('the action', action)
      state.products = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Create a slice for users
const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {
    // Define reducers for updating users state
    setUsers(state, action) {
      state.users = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer functions for products and users
export const { setProducts, setLoading: setProductsLoading, setError: setProductsError } = productsSlice.actions;
export const { setUsers, setLoading: setUsersLoading, setError: setUsersError } = usersSlice.actions;

// Combine reducers
const rootReducer = {
  products: productsSlice.reducer,
  users: usersSlice.reducer,
};

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
