import { baseApiSlice } from "../api/baseApiSlice";

export const customerApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersCustomers: builder.query({
      query: (page = 1) => `customer/all?page=${page}`,
      providesTags: ["Customer"],
    }),
    createCustomer: builder.mutation({
      query: (customerInfo) => ({
        url: "/customer/create",
        method: "POST",
        body: customerInfo,
      }),
      invlidateTags: ["Customer"],
    }),
    getSingleCustomer: builder.query({
      query: (customerId) => `/customer/${customerId}`,
      providesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...otherFields }) => ({
        url: `/customer/${id}`,
        method: "PATCH",
        body: otherFields,
      }),
      invlidateTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetAllUsersCustomersQuery,
  useCreateCustomerMutation,
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApiSlice;
