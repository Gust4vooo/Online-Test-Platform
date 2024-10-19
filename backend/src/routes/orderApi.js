// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// export const orderApi = createApi({
//     reducerPath: "orderApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${import.meta.env.VITE_BASE_URL}/order` ,
//         credentials: "include",
//     }),
//     endpoints: (builder) => ({
//         getToken: builder.mutation({
//             query: (body) => ({
//                 url: "/process-transaction",
//                 method: "POST",
//                 body
//             }),
//         }),
//     }),
// });

// export const {useGetTokenMutation} = orderApi;