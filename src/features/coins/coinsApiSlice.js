import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../../app/api/apiSlice";

export const coinsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query({
      query: () => {
        return {
          url: "/api/coins/currencies/review",
          method: "GET",
        };
      },
    }),
    getTrendingCoins: build.query({
      query: async () => {
        const check = await AsyncStorage.getItem("trendingCoins");
        if (!check) {
          return {
            url: "/api/coins/trending-coins/review",
            method: "GET",
          };
        }
        if (check) {
          return {
            url: "",
          };
        }
      },
    }),
    getCategories: build.query({
      query: () => {
        return {
          url: `/api/coins/categories/review`,
          method: "GET",
        };
      },
    }),
    getMarkets: build.query({
      query: async (arg) => {
        const { vs_currency, category, order, perPage, page } = arg;
        const check = await AsyncStorage.getItem("markets");
        if (!check) {
          return {
            url: "/api/coins/markets/review",
            method: "GET",
            params: {
              vs_currency,
              category,
              order,
              perPage,
              page,
            },
          };
        }
        if (check) {
          return {
            url: "",
          };
        }
      },
    }),
    getAllcoinsImage: build.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: "/api/coins/all-coins-image/review",
          method: "GET",
          params: {
            // perPage,
            page: page,
          },
        };
      },
    }),
    getCoinImage: build.query({
      query: (arg) => {
        const { ids } = arg;
        return {
          url: "/api/coins/coin-image/review",
          method: "GET",
          params: {
            ids: ids,
          },
        };
      },
    }),
    getCoinsHistoryChart: build.query({
      query: (arg) => {
        const { coinID, days } = arg;
        return {
          url: `/api/coins/history-chart/review?coinID=${coinID}&days=${days}`,
          method: "GET",
        };
      },
    }),
    getCoinInfo: build.query({
      query: (arg) => {
        const { vs_currency, ids } = arg;
        return {
          url: `/api/coins`,
          method: "GET",
          params: {
            vs_currency: vs_currency,
            ids: ids,
          },
        };
      },
    }),
    getCoinInfoDetails: build.query({
      query: (arg) => {
        const { ids } = arg;
        return {
          url: `/api/coins/details/review`,
          method: "GET",
          params: {
            ids: ids,
          },
        };
      },
    }),
    getDerivativesDetails: build.query({
      query: (arg) => {
        const { perPage, page } = arg;
        return {
          url: `/api/coins/derivatives/review`,
          method: "GET",
          params: {
            perPage: perPage,
            page: page,
          },
        };
      },
    }),
    getExchangesDetails: build.query({
      query: (arg) => {
        const { perPage, page } = arg;
        return {
          url: `/api/coins/exchanges/review`,
          method: "GET",
          params: {
            perPage: perPage,
            page: page,
          },
        };
      },
    }),
    getTransactions: build.query({
      query: () => {
        return {
          url: `/api/coins/transactions/review`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCurrenciesQuery,
  useGetTrendingCoinsQuery,
  useGetCategoriesQuery,
  useGetMarketsQuery,
  useGetAllcoinsImageQuery,
  useGetCoinImageQuery,
  useGetCoinsHistoryChartQuery,
  useGetCoinInfoQuery,
  useGetCoinInfoDetailsQuery,
  useGetDerivativesDetailsQuery,
  useGetExchangesDetailsQuery,
  useGetTransactionsQuery,
} = coinsApiSlice;
