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
GitHub-Frontend : https://github.com/sujon-258549/assungment-4-car-frontend.git
GitHub-Backend : https://github.com/sujon-258549/level-2-assignment-2.git
Live-Link : https://car-shop-one-indol.vercel.app
Admin user-email: sujon@gmail.com
Admin User-password : 1234567
Video Presentation Link: https://drive.google.com/file/d/1G7ayLlxJ3h5ZQcqCTm0VLTHC3yWxlMdl/view?usp=sharing
