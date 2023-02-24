import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://da70backend.onrender.com/",
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
