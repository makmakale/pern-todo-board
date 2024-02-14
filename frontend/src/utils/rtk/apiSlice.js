import { logOut } from '@/utils/rtk/auth/authSlice';
import { setNotification } from '@/utils/rtk/notifications/notifySlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://todo-board-uue7.onrender.com/api' : '/api',
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logOut());
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
