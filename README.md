# React-Query 설치

> 기본적인 사용 방식은 v4 버전을 기본값으로 코드를 작성

```bash
# v3
npm i react-query
# devtools는 자동으로 설치
# or
yarn add react-query
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
  - `refetchInterval: number | false | ((data: TData | undefined, query: Query) => number | false)`
    - 시간(ms)을 값으로 넣어주면 일정 시간마다 자동으로 `refetch`
  - `refetchIntervalInBackground: boolean`
    - 브라우저에 `focus`되어 있지 않아도 `refetch`를 시켜주는 것을 의미

- `retry: boolean | number | (failureCount: number, error: TError) => boolean`

  - 쿼리가 실패하면 `useQuery`를 특정 횟수만큼 재요청하는 옵션
  - `false`인 경우, 실패한 쿼리는 기본적으로 다시 시도하지 않음
  - `true`인 경우에는 실패한 쿼리에 대해서 무한 재요청을 시도
  - Default: `3`

- `select`

  - 해당 쿼리 함수에서 반환된 데이터의 일부를 변환하거나 선택할 수 있는 옵션

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
        select: (data) => {
          const allData = data?.data.results.map((res) => res);
          // 데이터 사용 시, allData.device_id로 비교적 짧은 코드로 작성할 수 있도록 변환
          return allData;
        },
      });

      // ...

    };
    ```

<br/>

# `useQueries`

## `useQuery` 여러 개 🤜 🔥 🤛 `useQueries`

### `useQuery` 여러 개

```JavaScript
const getBuoyData = async (id) => {
	return await axios.get(`https://api.odn-it.com/devices/${id}/`);
};

const { data: buoy10 } useQuery(["buoy", 10],
		() => getBuoyData(10),
		{
	    cacheTime: 5 * 60 * 1000, // 5분
	    staleTime: 1 * 60 * 1000, // 1분
	    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
	    refetchOnMount: true,
	    retry: 2, // error시 fetch 재시도
			select: (data) => {
        const detailData = data?.data;
        return detailData;
      },
	  }
	);

const { data: buoy12 } useQuery(["buoy", 12],
		() => getBuoyData(12),
		{
	    cacheTime: 5 * 60 * 1000, // 5분
	    staleTime: 1 * 60 * 1000, // 1분
	    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
	    refetchOnMount: true,
	    retry: 2, // error시 fetch 재시도
			select: (data) => {
        const detailData = data?.data;
        return detailData;
      },
	  }
	);

const { data: buoy14 } useQuery(["buoy", 14],
		() => getBuoyData(14),
		{
	    cacheTime: 5 * 60 * 1000, // 5분
	    staleTime: 1 * 60 * 1000, // 1분
	    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
	    refetchOnMount: true,
	    retry: 2, // error시 fetch 재시도
			select: (data) => {
        const detailData = data?.data;
        return detailData;
      },
	  }
	);

const { data: buoy100 } useQuery(["buoy", 100],
		() => getBuoyData(100),
		{
	    cacheTime: 5 * 60 * 1000, // 5분
	    staleTime: 1 * 60 * 1000, // 1분
	    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
	    refetchOnMount: true,
	    retry: 2, // error시 fetch 재시도
			select: (data) => {
        const detailData = data?.data;
        return detailData;
      },
	  }
	);
```

### `useQueries`의 Dynamic Parallel

```JavaScript
const getBuoyData = async (id) => {
  return await axios.get(`https://api.odn-it.com/devices/${id}/`);
};

const data = useQueries({
    queries: [10, 12, 14, 100].map((id) => {
      return {
        queryKey: ["buoy", id],
        queryFn: () => getOxygenData(id),
        cacheTime: 5 * 60 * 1000, // 5분
        staleTime: 1 * 60 * 1000, // 1분
        refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
        refetchOnMount: true,
        retry: 2, // error시 fetch 재시도
        enable: !!id,
				select: (data) => {
		      const detailData = data?.data;
		      return detailData;
		    },
      };
    }),
  });
```

## 위의 코드를 통한 결론

- 여러 개의 `useQuery`를 선언하는 경우, 일반적으로 쿼리 함수들은 병렬로 요청돼서 처리됨

- 쿼리 여러 개를 동시에 수행하는 경우, 렌더링이 거듭될 때마다 계혹 쿼리가 수행되야 하는 경우가 발생

- 이러한 쿼리 수행 로직이 결국 hook 규칙에 어긋날 수도 있기 때문에 `useQueries`를 사용하여 코드의 가독성과 길이, 효율성을 극대화 할 수 있음

<br/>

# `useQueryClient`

- `QueryClient` 인스턴스를 반환하며, `QueryClient`를 통해 캐시와 상호작용함

## 기본 사용법

```Javascript
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();
```

## Initail Query Data

- 쿼리에 대한 초기 데이터가 필요하기 전에 캐시에서 제공하여 초기값을 지정해주는 방법

- `useQuery`의 `initialData` 옵션을 통해서 쿼리를 미리 채워 넣으므로써 초기 로드 상태를 건너 뛸 수 있음

### 구현 코드

```JavaScript
export const useBuoyDetail = (id) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["buoy-detail", id],
    () => getBuoyData(id),
    {
      cacheTime: 5 * 60 * 1000, // 5분
      staleTime: 1 * 60 * 1000, // 1분
      refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
      refetchOnMount: true,
      retry: 2, // error시 fetch 재시도
      // refetchInterval: 5000, // polling (시간에 따라 refetch)
      // refetchIntervalInBackground: false,
      select: (data) => {
        const detailData = data?.data;
        return detailData;
      },
      initialData: () => {
        const cacheData = queryClient
          .getQueryData(["buoy"])
          ?.data?.results?.find((data) => data.device_id === parseInt(id));

        if (cacheData) {
          console.log({ cacheData: cacheData });
					// {cacheData: {…}}
          return { data: cacheData };
        } else {
          console.log({ cacheData: undefined });
					// {cacheData: undefined}
          return undefined;
        }
      },
    }
  );
};
```

- 위의 예시에서 `queryClient.getQueryData` 메서드는 기존 쿼리의 캐싱된 데이터를 가져오기 위해 사용할 수 있는 동기 함수

  - 쿼리가 존재하지 않는다면 `undefined`를 반환

- 해당 데이터의 형태를 정확히 할아야 `find`를 통해 같은 id 값을 찾아 캐시를 불러와 채울 수 있음

## `invalidateQueries`

- 해당 쿼리의 캐시를 무효화 할 수 있는 방법

### 구현 코드

```JavaScript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addHeroData = async (hero) => {
  return await axios.post("http://localhost:5000/superheroes", hero);
};

export const useAddHero = () => {
  const queryClient = useQueryClient();

  return useMutation(addHeroData, {
    onSuccess: () => {
      queryClient.invalidateQueries("heroes");
    },
  });
};
```

- 해당 구현 코드는 `useMutation`을 사용한 CRUD 예제 중 하나

- 해당 쿼리를 통해 `queryKey`가 "heroes"인 쿼리의 캐시를 무효화하여 실시간으로 데이터를 최신화

<br/>

# `useMutation` ✨

> 데이터 통신의 CRUD 기능을 가능하게 해줌
> 쉽게 생각해서 Create, Update, Delete는 `useMutation`를 사용하며, Read는 `useQuery`를 사용
>
> > 여기서 사용할 예제는 부표 데이터가 아닌 json-server를 사용한 임의의 영웅 데이터를 통해 진행할 예정
> >
> > (부표 데이터 API의 경우, GET을 통해 데이터 조회만 가능)

## `useMutation`의 `return` 값

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
