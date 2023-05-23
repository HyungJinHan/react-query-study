# React-Query 설치

```bash
# v3
npm i react-query
# devtools는 자동으로 설치
# or
yarn add  react-query
# devtools는 자동으로 설치

# v4
npm i @tanstack/react-query
npm i @tanstack/react-query-devtools
# or
yarn add @tanstack/react-query
yarn add @tanstack/react-query-devtools
```

<br/>

# `Client Props` 연결 / `DevTools` 사용

```JavaScript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}> {/* client props 연결 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> {/* dev tool 사용 */}
  </QueryClientProvider>
);

reportWebVitals();

```

<br/>

# `useQuery`

```JavaScript
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQOdnBuoy = () => {
  const getBuoyData = async () => {
    return await axios.get("http://localhost:4000/superheroes");
    // json-server 사용
  };

  const { status, data, error } = useQuery(
    queryKey, // v4부터 배열의 형태로 작성 ex) ["buoy"]
    queryFn, // Promise를 반환하는 함수 ex) getBuoyData
    {
    // 기타 옵션 ex) enable, staleTime, ...
  });

  // ...

};
```

## `useQuery`의 return값

- `status: string` - 쿼리 요청 함수의 상태를 표현하는 문자열 형태의 값 (에러 핸들링 가능)

  - `loading` - 캐시된 데이터가 없고 로딩 중인 상태
  - `error` - 요청 에러 발생 시의 상태
  - `success` - 요청 성공 시의 상태

- `data: TData` - Default는 `undefined`

- `isLoading: boolean` - 캐싱 된 데이터가 있다면 로딩 여부와 상관없이 `false`를 반환

- `isError: boolean` - 에러가 발생할 시, `true`값 반환

- `isFetched: boolean` - 쿼리가 실행되며 `fetching` 진행 중(로딩)일 시, `boolean`을 반환

- `error: null | TError` - 쿼리 함수에 오류가 발생할 시, 쿼리에 대한 오튜 객체를 반환
