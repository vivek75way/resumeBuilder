import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { logoutUser, refreshToken } from "../store/reducers/authReducer";

const baseUrl = "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = localStorage.getItem("accessToken") || state.auth.user.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Access token expired. Attempting to refresh...");

    const refreshTokenValue = localStorage.getItem("refreshToken");
    if (!refreshTokenValue) {
      console.log("No refresh token available. Logging out...");
      api.dispatch(logoutUser());
      return result;
    }

    // Refresh token request
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh-token",
        method: "POST",
        body: { refreshToken: refreshTokenValue },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log("Token refreshed successfully");

      // Store the new tokens correctly
      localStorage.setItem("accessToken", refreshResult.data.accessToken);
      localStorage.setItem("refreshToken", refreshResult.data.refreshToken);

      api.dispatch(refreshToken(refreshResult.data.accessToken));

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh token expired. Logging out...");
      api.dispatch(logoutUser());
    }
  }

  return result;
};


export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: `/user/login`, method: "POST", body }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: `/user/register`, method: "POST", body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: `/user/logout`, method: "POST" }),
    }),
    createResume: builder.mutation({
      query: (body) => ({ url: `/resume/createresume`, method: "POST", body }),
    }),
    updateResume: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/resume/updateresume/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteResume: builder.mutation({
      query: (id) => ({
        url: `/resume/deleteresume${id}`,
        method: "DELETE",
      }),
    }),
    getAllResumes: builder.query({
      query: () => `/resume/getallresume`,
    }),
    getResumeById: builder.query({
      query: (id) => `resume/getresume/${id}`,
    }),
  }),
});

// Hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useGetAllResumesQuery,
  useGetResumeByIdQuery,
} = api;
