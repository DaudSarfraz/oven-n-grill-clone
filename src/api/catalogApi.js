import { baseApi } from './baseApi';

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesCatalog: builder.query({
      query: () => '/API/api/CustomerOrders/sales-catalog-noauth?branchId=1&brandId=1',
    }),
  }),
});

export const { useGetSalesCatalogQuery } = catalogApi; 