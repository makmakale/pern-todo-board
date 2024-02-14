import { logOut, setCredentials } from '@/utils/rtk/auth/authSlice';
import { setNotification } from '@/utils/rtk/notifications/notifySlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://todo-board-uue7.onrender.com/api' : '/api',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/users/refresh', api, extraOptions);

    if (refreshResult?.data) {
      const { userInfo } = api.getState().auth;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, userInfo }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  if (result?.meta?.response?.ok && result?.data?.message) {
    api.dispatch(setNotification({ type: 'success', message: result.data.message }));
  }

  if (result?.error?.data?.message) {
    api.dispatch(setNotification({ type: 'error', message: result.error.data.message }));
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tasks', 'Task', 'User'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
