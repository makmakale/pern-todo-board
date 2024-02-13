import { apiSlice } from '@/utils/rtk/apiSlice';

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ['Tasks'],
    }),

    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: ['Task'],
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
    }),

    editTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tasks', 'Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useEditTaskMutation,
} = taskApiSlice;
