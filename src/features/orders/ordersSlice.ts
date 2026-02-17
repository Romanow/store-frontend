import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../shared/api/client';
import { DetailedOrderResponse, OrderResponse } from '../../shared/api/types';

interface OrdersState {
  list: OrderResponse[];
  selectedOrderUid: string | null;
  details: DetailedOrderResponse | null;
  loadingList: boolean;
  loadingDetails: boolean;
  error?: string;
}

const initialState: OrdersState = {
  list: [],
  selectedOrderUid: null,
  details: null,
  loadingList: false,
  loadingDetails: false
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => apiClient.getOrders());

export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (orderUid: string) => {
  return apiClient.getOrderDetails(orderUid);
});

export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (orderUid: string, { dispatch }) => {
  await apiClient.cancelOrder(orderUid);
  await dispatch(fetchOrders());
  return orderUid;
});

export const requestOrderWarranty = createAsyncThunk(
  'orders/requestOrderWarranty',
  async (payload: { orderUid: string; itemNames: string[] }, { dispatch }) => {
    await apiClient.requestWarranty(payload.orderUid, payload.itemNames);
    await dispatch(fetchOrderDetails(payload.orderUid));
    return payload.orderUid;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    openOrderModal(state, action: PayloadAction<string>) {
      state.selectedOrderUid = action.payload;
    },
    closeOrderModal(state) {
      state.selectedOrderUid = null;
      state.details = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loadingList = true;
        state.error = undefined;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loadingDetails = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.details = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loadingDetails = false;
        state.error = action.error.message;
      })
      .addCase(cancelOrder.fulfilled, (state) => {
        state.selectedOrderUid = null;
        state.details = null;
      });
  }
});

export const { openOrderModal, closeOrderModal } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
