install redux
https://redux.js.org/tutorials/quick-start

<!-- step -1 -->

create redux file and create store //! flow redux typsctypt tutorial

<!-- flow link  -->

https://redux.js.org/tutorials/typescript-quick-start

<!-- provider -->

add main.jsx
<provide store={store}> //any main file</provide>

1.create base api
store file work

1.  <!-- login fansonality -->

<!-- authentication -->
<!-- step-1 -->

base abi
authSlice create

name
intrastate
reducer

and
export reducer

Create base api
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({

<!-- reducerPath: "baseApi", --> create reducer path
<!-- baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), -->

endpoints: (builder) => ({
login: builder.mutation({ //poyent
query: (userInfo) => ({
url: "/user/login",
method: "POST",
body: userInfo,
}),
}),
}),
});

export default baseApi

base api connect for stor

<!-- cookey related 27.6---------------------------------------------------- -->

step1.
baseApi / baseUrl url ar pore credential:include and course base url : credential:true

redux dispatch use and set user and token

<!-- npm i jwt-decode  --> // decode for jwt

<!-- token set local store use --> redux parsist  //27.8

<!-- ignore  -->

https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist

<!-- frontend url -->

https://car-shop-one-indol.vercel.app

<!-- baqend url -->

https://assignment2-eta-topaz.vercel.app
