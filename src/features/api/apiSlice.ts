import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Item, Order} from "../../types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["Items", "Orders"],
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => `/warehouse/api/public/v1/items`,
            providesTags: ["Items"],
        }),
        purchaseOrder: builder.mutation({
            query: (body) => ({
                url: `/store/api/protected/v1/orders/purchase`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Orders"],
        }),
        cancelOrder: builder.mutation({
            query: (orderUid) => ({
                url: `/store/api/protected/v1/orders/${orderUid}/cancel`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"],
        }),
        requestWarranty: builder.mutation({
            query: ({orderUid, body}) => ({
                url: `/store/api/protected/v1/orders/${orderUid}/warranty`,
                method: "POST",
                body,
            }),
        }),
        getOrders: builder.query({
            query: () => `/store/api/protected/v1/orders`,
            providesTags: ["Orders"],
        }),
        getOrderDetails: builder.query<Order, string>({
            query: (orderUid) => `/store/api/protected/v1/orders/${orderUid}`,
            providesTags: (_r, _e, arg) => [{type: "Orders", id: arg}],
        }),
    }),
});

export const {
    useGetItemsQuery,
    usePurchaseOrderMutation,
    useCancelOrderMutation,
    useRequestWarrantyMutation,
    useGetOrdersQuery,
    useGetOrderDetailsQuery,
} = apiSlice;
