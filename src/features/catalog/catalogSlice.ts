import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../shared/api/client';
import { ItemInfo } from '../../shared/api/types';

interface CatalogState {
  items: ItemInfo[];
  selectedItem: ItemInfo | null;
  loading: boolean;
  error?: string;
}

const initialState: CatalogState = {
  items: [],
  selectedItem: null,
  loading: false
};

export const fetchItems = createAsyncThunk('catalog/fetchItems', async () => {
  return apiClient.getItems();
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    openItemModal(state, action: PayloadAction<ItemInfo>) {
      state.selectedItem = action.payload;
    },
    closeItemModal(state) {
      state.selectedItem = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { openItemModal, closeItemModal } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
