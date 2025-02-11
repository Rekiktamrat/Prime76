// Import necessary modules
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saleService from "./saleService";

// Async actions
export const getAllTransactions = createAsyncThunk(
  "sales/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await saleService.getAllTransactions();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "sales/delete",
  async (id, thunkAPI) => {
    try {
      await saleService.deleteTransaction(id);
      return id; // Returning ID to remove it from the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "sales/add",
  async (data, thunkAPI) => {
    try {
      const response = await saleService.addTransaction(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "sales/update",
  async (data, thunkAPI) => {
    try {
      const response = await saleService.updateTransaction(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const saleSlice = createSlice({
  name: "sales",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        );
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })

      // Update a transaction
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      });
  },
});

export default saleSlice.reducer;
