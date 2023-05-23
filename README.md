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
    return await axios.get("https://api.odn-it.com/devices/");
  };

  const {
    // useQuery의 return 값 ex) status, data, error, ...
  } = useQuery(
    queryKey, // v4부터 배열의 형태로 작성 ex) ["buoy"]
    queryFn, // Promise를 반환하는 함수 ex) getBuoyData
    {
    // 기타 옵션 ex) cacheTime, staleTime, refetchOnWindowFocus, refetchOnMount, retry, ...
  });

  // ...

};
```

## `useQuery`의 return 값

- `status: string` - 쿼리 요청 함수의 상태를 표현하는 문자열 형태의 값 (에러 핸들링 가능)

  - `loading` - 캐시된 데이터가 없고 로딩 중인 상태
  - `error` - 요청 에러 발생 시의 상태
  - `success` - 요청 성공 시의 상태

- `data: TData` - Default는 `undefined`

- `isLoading: boolean` - 캐싱 된 데이터가 있다면 로딩 여부와 상관없이 `false`를 반환

- `isError: boolean` - 에러가 발생할 시, `true`값 반환

- `isFetched: boolean` - 쿼리가 실행되며 `fetching` 진행 중(로딩)일 시, `boolean`을 반환

- `error: null | TError` - 쿼리 함수에 오류가 발생할 시, 쿼리에 대한 오튜 객체를 반환

## `useQuery`의 Options

- `cacheTime: number | Infinity`

  - 데이터가 `inactive` 상태일 시, 캐싱 된 상태로 남아있는 시간
  - `staleTime`과 관계없이, 무조건 `inactive` 된 시점을 기준으로 캐시 데이터 삭제를 결정
  - Default: `300000` (5분)

- `staleTime: number | Infinity`

  - 데이터가 `fresh`에서 `stale` 상태로 변경되는 데 걸리는 시간
  - `fresh` 상태일 때는 쿼리 인스턴스가 새롭게 `mount` 되어도 네트워크 요청(`fetch`)이 일어나지 않음
  - Default: `0`

- `refetchOnWindowFocus: boolean | "always"`

  - 데이터가 `stale` 상태일 경우 <u>윈도우 포커싱</u> 될 때마다 `refetch`를 실행하는 옵션
  - `"always"` 로 설정하면 항상 윈도우 포커싱 될 때마다 `refetch`를 실행
  - Default: `true`

- `refetchOnMount: boolean | "always"`

  - 데이터가 `stale` 상태일 경우, `mount`마다 `refetch`를 실행하는 옵션
  - `"always"` 로 설정하면 마운트 시마다 매번 `refetch`를 실행
  - `false`로 설정하면 최초 `fetch` 이후에는 `refetch`하지 않음
  - Default: `true`

- `Polling`

  - 리얼타임 웹을 위한 기법으로 일정한 주기(특정한 시간)를 가지고 서버와 응답을 주고받는 방식
  - `refetchInterval: number` - 시간(ms)을 값으로 넣어주면 일정 시간마다 자동으로 `refetch`
  - `refetchIntervalInBackground: boolean` - 브라우저에 `focus`되어 있지 않아도 `refetch`를 시켜주는 것을 의미

- `retry: boolean | number | (failureCount: number, error: TError) => boolean`

  - 쿼리가 실패하면 `useQuery`를 특정 횟수만큼 재요청하는 옵션
  - `false`인 경우, 실패한 쿼리는 기본적으로 다시 시도하지 않음
  - `true`인 경우에는 실패한 쿼리에 대해서 무한 재요청을 시도
  - Default: `3`

<br/>

# Error Handling

```JavaScript
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQOdnBuoy = () => {
  const getBuoyData = async () => {
    return await axios.get("https://api.odn-it.com/devices/");
  };

  const { status, data, error } = useQuery(
    queryKey, // v4부터 배열의 형태로 작성 ex) ["buoy"]
    queryFn, // Promise를 반환하는 함수 ex) getBuoyData
    {
    // 기타 옵션 ex) cacheTime, staleTime, refetchOnWindowFocus, refetchOnMount, retry, ...
  });

  // 에러 / 로딩 핸들링
  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  if (status === "error") {
    return <h2>Error : {error.message}</h2>;
  }

  // ...

};
```
