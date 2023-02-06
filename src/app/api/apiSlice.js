import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.1.2:5000",
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQuery,
  tagTypes: ["Note", "User"],
  endpoints: () => ({}),
});
