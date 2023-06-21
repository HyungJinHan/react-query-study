### 목차

- [React-Query 설치](#react-query-설치)
- [`Client Props` 연결](#client-props-연결)
- [`DevTools` 사용](#devtools-사용)
- [`useQuery`](#usequery)
  - [`useQuery`의 return 값](#usequery의-return-값)
  - [`useQuery`의 Options](#usequery의-options)
- [`useQueries`](#usequeries)
  - [`useQuery` 여러 개 VS `useQueries`](#usequery-여러-개-vs-usequeries)
- [`useQueryClient`](#usequeryclient)
  - [기본 사용법](#기본-사용법)
  - [Initail Query Data](#initail-query-data)
  - [`invalidateQueries`](#invalidatequeries)
  - [`setQueryData`](#setquerydata)
- [`useMutation` ✨](#usemutation-)
  - [`useMutation`의 `return` 값](#usemutation의-return-값)
  - [CRUD 구현 코드](#crud-구현-코드)
- [`Pagenation`](#pagenation)
  - [용존산소 데이터 페이지네이션](#용존산소-데이터-페이지네이션)
- [`Infinite Query`](#infinite-query)
  - [`useInfiniteQuery`의 return 값](#useinfinitequery의-return-값)
  - [`useInfiniteQuery`의 Options](#useinfinitequery의-options)
  - [용존산소 데이터 무한 스크롤](#용존산소-데이터-무한-스크롤)
- [Optimistic Update](#optimistic-update)
  - [Optimistic Update(낙관적 업데이트)란?](#optimistic-update낙관적-업데이트란)
- [Error Handling](#error-handling)

## [React-Query 설치](#목차)

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

## [`Client Props` 연결](#목차)

```JavaScript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
  </QueryClientProvider>
);

reportWebVitals();

```

<br/>

## [`DevTools` 사용](#목차)

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

## [`useQuery`](#목차)

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

### `useQuery`의 return 값

- `status: string` - 쿼리 요청 함수의 상태를 표현하는 문자열 형태의 값 (에러 핸들링 가능)

  - `loading` - 캐시된 데이터가 없고 로딩 중인 상태
  - `error` - 요청 에러 발생 시의 상태
  - `success` - 요청 성공 시의 상태

- `data: TData` - Default는 `undefined`

- `isLoading: boolean` - 캐싱 된 데이터가 있다면 로딩 여부와 상관없이 `false`를 반환

- `isError: boolean` - 에러가 발생할 시, `true`값 반환

- `isFetched: boolean` - 쿼리가 실행되며 `fetching` 진행 중(로딩)일 시, `boolean`을 반환

- `error: null | TError` - 쿼리 함수에 오류가 발생할 시, 쿼리에 대한 오튜 객체를 반환

### `useQuery`의 Options

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

## [`useQueries`](#목차)

### `useQuery` 여러 개 VS `useQueries`

- `useQuery` 여러 개

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

- `useQueries`의 Dynamic Parallel

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

- 여러 개의 `useQuery`를 선언하는 경우, 일반적으로 쿼리 함수들은 병렬로 요청돼서 처리됨

- 쿼리 여러 개를 동시에 수행하는 경우, 렌더링이 거듭될 때마다 계속 쿼리가 수행되야 하는 경우가 발생

- 이러한 쿼리 수행 로직이 결국 hook 규칙에 어긋날 수도 있기 때문에 `useQueries`를 사용하여 코드의 가독성과 길이, 효율성을 극대화 할 수 있음

<br/>

## [`useQueryClient`](#목차)

- `QueryClient` 인스턴스를 반환하며, `QueryClient`를 통해 캐시와 상호작용함

### 기본 사용법

```Javascript
  import { useQueryClient } from "react-query";

  const queryClient = useQueryClient();
```

### Initail Query Data

- 쿼리에 대한 초기 데이터가 필요하기 전에 캐시에서 제공하여 초기값을 지정해주는 방법

- `useQuery`의 `initialData` 옵션을 통해서 쿼리를 미리 채워 넣으므로써 초기 로드 상태를 건너 뛸 수 있음

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

### `invalidateQueries`

- 해당 쿼리의 캐시를 무효화 할 수 있는 방법

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

### `setQueryData`

- `invalidateQueries`와 같이 모든 캐시를 무효화 한 뒤 refetch를 하는 경우, 기존의 캐시된 데이터가 많다면 fetch 속도가 느려지는 문제가 생김

```JavaScript
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import axios from "axios";

  const addHeroData = async (hero) => {
    return await axios.post("http://localhost:5000/superheroes", hero);
  };

  export const useAddHero = (pageNum) => {
    const queryClient = useQueryClient();

    return useMutation(addHeroData, {
      onSuccess: (data) => {
        queryClient.setQueryData(["heroes", pageNum], (oldData) => {
          return {
            ...oldData,
            data: [...oldData?.data, data?.data],
          };
        });
        // 쿼리의 캐시된 데이터를 즉시 업데이트하여 실시간으로 수정된 부분을 최신화 시켜주는 작업
      },
    });
  };
```

- 수정된 부분의 쿼리 데이터를 수동으로 설정하여 쿼리 데이터 내부 로직 자체에서 업데이트하도록 설정하는 방법

- 정확한 의미로는 서버와 실시간으로 동기화 됐다고는 볼 수 없음

  - 하지만, UX 부분에서 보자면 피드백이 즉각적으로 이루어지고 있는 것 처럼 보이기 때문에 유리한 부분이 분명 존재함

<br/>

## [`useMutation` ✨](#목차)

> 데이터 통신의 CRUD 기능을 가능하게 해줌
> 쉽게 생각해서 Create, Update, Delete는 `useMutation`를 사용하며, Read는 `useQuery`를 사용
>
> > 여기서 사용할 예제는 부표 데이터가 아닌 json-server를 사용한 임의의 영웅 데이터를 통해 진행할 예정
> >
> > (부표 데이터 API의 경우, GET을 통해 데이터 조회만 가능)

### `useMutation`의 `return` 값

- `mutate`

  - `mutation` 객체의 `mutate` 메서드를 통해 요청 함수를 호출하여 사용할 수 있음

  - `onSuccess / onError`

    - 해당 메서드를 통해 성공했을 시, `response` 데이터를 핸들링할 수 있음

### CRUD 구현 코드

- C - Create

  - `RQHeroes.jsx`

    ```JavaScript
      import React, { useState } from "react";
      import { Link } from "react-router-dom";
      import { useHeroes } from "../hooks/useHeroes";
      import { useAddHero } from "../hooks/useMutation";

      const RQHeroes = () => {
        const [name, setName] = useState("");
        const [alterEgo, setAlterEgo] = useState("");

        const { status, data, error, isFetching, refetch } = useHeroes();
        const { mutate: addHero } = useAddHero();

        const handleAddHero = () => {
          const hero = { name, alterEgo };
          addHero(hero);
        };

        if (isFetching) {
          return (
            // ...
          );
        }

        /** 아래 코드로 에러 핸들링 끝 */
        if (status === "error") {
          // status -> success, loading, error...
          return (
            // ...
          );
        }

        return (
          // ...
        );
      };

      export default RQHeroes;
    ```

  - `useMutation.js` → `useAddHero()`

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
            // post, delete 시, 실시간으로 최신화 시켜주는 작업
            // 키가 여러 개라면, ["heroes", "detail", ...]
          },
        });
      };
    ```

- R - Read

  - [`useQuery` 부분 참고](#usequery)

- U - Update

  - `RQHeroDetail.jsx`

    ```JavaScript
      import React, { useState } from "react";
      import { useLocation, useParams } from "react-router-dom";
      import { useHeroDetail } from "../hooks/useHeroDetail";
      import { useUpdateHero } from "../hooks/useMutation";

      const RQHeroDetail = () => {
        const { id } = useParams();
        const location = useLocation();
        const { status, data, error, isFetching } = useHeroDetail(id);
        const [updateValue, setUpdateValue] = useState({
          name: data?.name,
          alterEgo: data?.alterEgo,
        });
        const name = updateValue.name;
        const alterEgo = updateValue.alterEgo;
        const hero = { name, alterEgo };
        const { mutate: updateHero } = useUpdateHero(id, hero);
        const [updateToggle, setUpdateToggle] = useState(false);

        const handleChange = (e) => {
          const { name, value } = e.target;
          setUpdateValue({ ...updateValue, [name]: value });
        };

        const handleUpdate = () => {
          updateHero(id, hero);
        };

        if (isFetching) {
          return (
            // ...
          );
        }

        /** 아래 코드로 에러 핸들링 끝 */
        if (status === "error") {
          // status -> success, loading, error...
          return (
            // ...
          );
        }

        return (
          // ...
        );
      };

      export default RQHeroDetail;
    ```

  - `useMutation.js` → `useUpdateHero()`

    ```JavaScript
      import { useMutation, useQueryClient } from "@tanstack/react-query";
      import axios from "axios";

      const updateHeroData = async (id, hero) => {
        return await axios.put(`http://localhost:5000/superheroes/${id}`, hero);
      };

      export const useUpdateHero = (id, hero) => {
        const queryClient = useQueryClient();

        return useMutation(() => updateHeroData(id, hero), {
          onSuccess: () => {
            console.log({ updateValue: { id: id, hero: hero } });
            // updateValue: {id: '9', hero: {…}}
            queryClient.invalidateQueries("heroes");
            // post, delete 시, 실시간으로 최신화 시켜주는 작업
            // 키가 여러 개라면, ["heroes", "detail", ...]
          },
        });
      };
    ```

- D - Delete

  - `RQHeroes.jsx`

    ```JavaScript
      import React, { useState } from "react";
      import { Link } from "react-router-dom";
      import { useHeroes } from "../hooks/useHeroes";
      import { useAddHero, useDeleteHero } from "../hooks/useMutation";

      const RQHeroes = () => {
        const [name, setName] = useState("");
        const [alterEgo, setAlterEgo] = useState("");

        const { status, data, error, isFetching, refetch } = useHeroes();
        const { mutate: addHero } = useAddHero();
        const { mutate: deleteHero } = useDeleteHero();

        const handleAddHero = () => {
          const hero = { name, alterEgo };
          addHero(hero);
        };

        const handleDeleteHero = (id) => {
          deleteHero(id);
        };

        if (isFetching) {
          return (
            // ...
          );
        }

        /** 아래 코드로 에러 핸들링 끝 */
        if (status === "error") {
          // status -> success, loading, error...
          return (
            // ...
          );
        }

        return (
          // ...
        );
      };

      export default RQHeroes;
    ```

  - `useMutation.js` → `useDeleteHero()`

    ```JavaScript
      import { useMutation, useQueryClient } from "@tanstack/react-query";
      import axios from "axios";

      const deleteHeroData = async (id) => {
        return await axios.delete(`http://localhost:5000/superheroes/${id}`);
      };

      export const useDeleteHero = () => {
        const queryClient = useQueryClient();

        return useMutation(deleteHeroData, {
          onSuccess: () => {
            queryClient.invalidateQueries("heroes");
            // post, delete 시, 실시간으로 최신화 시켜주는 작업
            // 키가 여러 개라면, ["heroes", "detail", ...]
          },
        });
      };
    ```

<br/>

## [`Pagenation`](#목차)

> 해당 페이지네이션 구현을 위한 `page`, `size`, `limit` 등 해당 API에서의 설정법에 따라 코드가 변경될 수 있음
> React-Query에서 지원하는 것이 아닌, `queryKey` 값을 통해 구현
>
> 실제 공식 사이트의 사용법과 다르게 해당 API의 데이터인 next uri 데이터를 통해 다음 데이터의 존재 여부를 체크하는 식으로 구현
>
> (다음 페이지 버튼 비활성화를 위함)

### 용존산소 데이터 페이지네이션

- `RQOdnBuoyOxygen.jsx`

  ```JavaScript
    import React, { useState } from "react";
    import { useBuoyOxygen } from "../hooks/useBuoyOxygen";
    import { useLocation } from "react-router-dom";
    import { useNextOxygen } from "../hooks/useNextOxygen";

    const RQOdnBuoyOxygen = () => {
      const [pageNum, setPageNum] = useState(1);
      const location = useLocation();
      const { id, deviceID, serialNumber } = location.state;
      const { data: nextData } = useNextOxygen(id, pageNum);
      const nextPage = nextData?.next;
      // 다음 페이지에 데이터가 존재하는 지를 API 데이터를 통해 체크
      const { status, data, error, isFetching } = useBuoyOxygen(id, pageNum);

      if (isFetching) {
        return (
          // ...
        );
      }

      /** 아래 코드로 에러 핸들링 끝 */
      if (status === "error") {
        // status -> success, loading, error...
        return (
          // ...
        );
      }

      return (
        // ...
      );
    };

    export default RQOdnBuoyOxygen;
  ```

  - API 통신이기 때문에 다음 페이지에 대한 데이터가 존재하지 않아 `404` 에러가 뜨는 것을 방지

  - 또한, 데이터를 전부 불러왔을 경우 다음 페이지 버튼을 `disabled` 하기 위한 작업을 진행

    - 해당 API 데이터의 경우 `next` uri와 `previous` uri가 존재하기 때문에 위와 같이 사용이 가능

- `useNextOxygen.js`

  ```JavaScript
    import { useQuery } from "@tanstack/react-query";
    import axios from "axios";

    const getNextData = async ({ queryKey }) => {
      const id = queryKey[1];
      const pageNum = queryKey[2];
      return await axios.get(
        `https://api.odn-it.com/devices/${id}/oxygens/?size=3&page=${pageNum}`
      );
    };

    export const useNextOxygen = (id, pageNum) => {
      return useQuery(["next-oxygen", id, pageNum], getNextData, {
        select: (data) => {
          const nextPage = data?.data;
          return nextPage;
        },
      });
    };
  ```

  - 다음 페이지의 데이터가 존재하는지의 여부를 체크하는 코드

- `useBuoyOxygen.js`

  ```JavaScript
    import { useQuery } from "@tanstack/react-query";
    import axios from "axios";

    const getOxygenData = async ({ queryKey }) => {
      const id = queryKey[1];
      const pageNum = queryKey[2];
      return await axios.get(
        `https://api.odn-it.com/devices/${id}/oxygens/?size=3&page=${pageNum}`
      );
    };

    export const useBuoyOxygen = (id, pageNum) => {
      return useQuery(["oxygen", id, pageNum], getOxygenData, {
        cacheTime: 5 * 60 * 1000, // 5분
        staleTime: 1 * 60 * 1000, // 1분
        refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
        refetchOnMount: true,
        retry: 2, // error시 fetch 재시도
        select: (data) => {
          const oxygenData = data?.data.results?.map((res) => res);
          return oxygenData;
        },
      });
    };
  ```

  - 실제 용존산소 데이터 불러오는 코드

- [해당 데이터의 REST API 주소 (ODN BUOY DATA API)](https://api.odn-it.com/devices/10/oxygens/?page=6&size=100)

- 해당 API 데이터 구조상, 다음 페이지를 불러올 수 있도록 존재하는 `next` 데이터를 통해 다음 페이지에 해당하는 uri를 체크하도록 데이터 통신을 추가했음

- 다음 페이지가 존재하지 않을 경우, API 데이터에서 자동으로 `next`에 해당하는 데이터를 `null`으로 출력하기 때문에, 다음 페이지가 `null`인 경우를 체크하여 데이터의 최종 페이지를 식별

<br/>

## [`Infinite Query`](#목차)

> 주로 무한 스크롤에 사용

### `useInfiniteQuery`의 return 값

- `data.pages: TData[]`

  - 해당 데이터의 모든 데이터를 담은 배열

- `data.pageParams: unknown[]`

  - 데이터를 불러올 때마다 해당 데이터의 params를 담은 배열

- `isFetchingNextPage: boolean`

  - 다음 페이지를 fetching 중일 경우 `true`

- `isFetchingPreviousPage: boolean`

  - 이전 페이지를 fetching 중일 경우 `true`

- `fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>`

  - 다음 페이지의 데이터를 fetch하기 위해 사용

- `fetchPreviousPage: (options?: FetchPreviousPageOptions) => Promise<UseInfiniteQueryResult>`

  - 이전 페이지의 데이터를 fetch하기 위해 사용

- `hasNextPage: boolean`

  - 다음 페이지의 데이터가 fetch 되었는지를 체크하여 fetch되었을 시 `true`

- `hasPreviousPage: boolean`

  - 이전 페이지의 데이터가 fetch 되었는지를 체크함

### `useInfiniteQuery`의 Options

- `pageParam`

  - 해당 프로퍼티를 통해 무한 스크롤을 위한 페이지 값을 전달할 수 있음
  - 아래의 예제의 경우, `getNextPageParam`의 조건을 통해 페이지를 추가적으로 증가하도록 구현
  - <b>반드시 기본값으로 초기 페이지 값을 설정해야 함</b>

- `getNextPageParam: (lastPage, allPages) => unknown | undefined`

  - 첫 번째 인자 `lastPage`는 fetch한 가장 최근에 가져온 페이지 목록
  - 두 번째 인자 `allPages`는 현재까지 가져온 모든 페이지 데이터

- `getPreviousPageParam: (firstPage, allPages) => unknown | undefined`

  - `getNextPageParam`의 반대의 속성을 가지고 있음

### 용존산소 데이터 무한 스크롤

> API 데이터의 특성을 이용하여 공식 설명 사이트의 예제와 구현하는 방식의 차이가 있음
>
> (해당 데이터 중, `next` / `previous` uri 데이터와 해당 데이터의 총 개수 데이터를 활용하여 구현)

- `RQOdnInfiniteOxygen.jsx`

  ```JavaScript
    import React, { Fragment, useState } from "react";
    import { useLocation } from "react-router-dom";
    import { useInfiniteOxygen } from "../hooks/useInfinite";
    import { useNextOxygen } from "../hooks/useNextOxygen";

    const RQOdnInfiniteOxygen = () => {
      const [pageNum, setPageNum] = useState(1);
      const location = useLocation();
      const { id, deviceID, serialNumber } = location.state;

      const { data: nextData } = useNextOxygen(id, pageNum);

      const pageCount = nextData?.count;
      const nextPage = nextData?.next;

      const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage } =
        useInfiniteOxygen(id, pageCount);

      /** 아래 코드로 에러 핸들링 끝 */
      if (status === "error") {
        // status -> success, loading, error...
        return (
          // ...
        );
      }

      return (
        // ...
      );
    };

    export default RQOdnInfiniteOxygen;
  ```

- `useNextOxygen.js`

  ```JavaScript
    import { useQuery } from "@tanstack/react-query";
    import axios from "axios";

    const getNextData = async ({ queryKey }) => {
      const id = queryKey[1];
      const pageNum = queryKey[2];
      return await axios.get(
        `https://api.odn-it.com/devices/${id}/oxygens/?size=3&page=${pageNum}`
      );
    };

    export const useNextOxygen = (id, pageNum) => {
      return useQuery(["next-oxygen", id, pageNum], getNextData, {
        select: (data) => {
          const nextPage = data?.data;
          return nextPage;
        },
      });
    };
  ```

- `useInfinite.js`

  ```JavaScript
    import { useInfiniteQuery } from "@tanstack/react-query";
    import axios from "axios";

    const getOxygenData = async ({ queryKey, pageParam = 1 }) => {
      const id = queryKey[1];
      return await axios.get(
        `https://api.odn-it.com/devices/${id}/oxygens/?size=3&page=${pageParam}`
      );
    };

    export const useInfiniteOxygen = (id, pageCount) => {
      return useInfiniteQuery(["oxygen-infinite", id], getOxygenData, {
        cacheTime: 5 * 60 * 1000, // 5분
        staleTime: 1 * 60 * 1000, // 1분
        refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
        refetchOnMount: true,
        retry: 2, // error시 fetch 재시도
        getNextPageParam: (_lastPage, allPages) => {
          return allPages.length < pageCount && allPages.length + 1;
        },
      });
    };
  ```

- [해당 데이터의 REST API 주소 (ODN BUOY DATA API)](https://api.odn-it.com/devices/10/oxygens/?page=6&size=100)

- 해당 API 데이터 구조상, 다음 페이지를 불러올 수 있도록 존재하는 `next` 데이터를 통해 다음 페이지에 해당하는 uri를 체크하도록 데이터 통신을 추가했음

- 다음 페이지가 존재하지 않을 경우, API 데이터에서 자동으로 `next`에 해당하는 데이터를 `null`으로 출력하기 때문에, 다음 페이지가 `null`인 경우를 체크하여 데이터의 최종 페이지를 식별

<br/>

## [Optimistic Update](#목차)

### Optimistic Update(낙관적 업데이트)란?

- 서버 업데이트 시, UI에서도 업데이트를 할 것이라고 (낙관적으로) 가정해서 미리 UI를 업데이트를 시켜주고 서버를 통해 검증을 받아 업데이트 또는 롤백하는 방식

- Optimistic Update는 인터넷 속도가 느리거나 서버가 느릴 때 굉장히 유용함

  - 유저가 행한 액션을 기다릴 필요 없이 바로 업데이트가 되는 것처럼 보이기 때문에 사용자의 경험(UX) 측면에서 좋음

```JavaScript
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import axios from "axios";

  const addHeroData = async (hero) => {
    return await axios.post("http://localhost:5000/superheroes", hero);
  };

  export const useAddHero = (pageNum) => {
    const queryClient = useQueryClient();

    return useMutation(addHeroData, {
      onMutate: async (newData) => {
        // Optimistic Update(낙관적 업데이트)를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제
        await queryClient.cancelQueries(["heroes", pageNum]);

        // 이전 값
        const prevData = queryClient.getQueryData(["heroes", pageNum]);

        // 새로운 값으로 Optimistic Update(낙관적 업데이트) 진행
        queryClient.setQueryData(["heroes", pageNum], (oldData) => {
          return {
            ...oldData,
            data: [
              ...oldData.data,
              { id: oldData?.data?.length + 1, ...newData },
            ],
          };
        });

        console.log({ prevData: { prevData } });

        return {
          // 값이 들어있는 context 객체를 반환
          prevData,
        };
      },

      // mutation 실패 시, onMutate에서 반환된 context를 사용하여 롤백 진행
      onError: (_error, _data, context) => {
        console.log({ prevData: context.prevData });
        queryClient.setQueryData(["heroes", pageNum], context.prevData);
      },

      // 오류 또는 성공 후, 항상 데이터 리프레쉬 진행
      onSettled: () => {
        console.log({ onSettled: "Refresh" });
        queryClient.invalidateQueries(["heroes", pageNum]);
      },
    });
  };
```

<br/>

## [Error Handling](#목차)

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
