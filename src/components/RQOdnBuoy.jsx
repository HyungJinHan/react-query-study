import React, { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQOdnBuoy = () => {
  const getBuoyData = async () => {
    return await axios.get("https://api.odn-it.com/devices/");
  };

  const { status, data, error } = useQuery(["buoy"], getBuoyData, {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
    retry: 2, // error시 fetch 재시도
  });
  // ["buoy"] -> queryFn
  // status -> success, loading, error...

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  /** 아래 코드로 에러 핸들링 끝 */
  if (status === "error") {
    return <h2>Error : {error.message}</h2>;
  }

  return (
    <Fragment>
      <h2>React-Query ODN Buoy Infomation</h2>
      {data?.data.results.map((res) => {
        return (
          <div key={res.device_id} style={{ paddingBottom: "1.25rem" }}>
            <div style={{ paddingBottom: ".5rem" }}>
              <span>
                <b>Device ID : </b>
              </span>
              <span>
                {res.serial_number}
                {res.device_id}
              </span>
            </div>

            <div style={{ paddingBottom: ".5rem" }}>
              <span>
                <b>Battery : </b>
              </span>
              <span>{res.battery}%</span>
            </div>

            <div style={{ paddingBottom: ".5rem" }}>
              <span>
                <b>Operating State </b>
              </span>
              <div
                style={{
                  width: ".75rem",
                  height: ".75rem",
                  borderRadius: "100%",
                  backgroundColor:
                    res.operating_state === true ? "green" : "red",
                  display: "inline-flex",
                  marginLeft: ".3125rem",
                }}
              />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default RQOdnBuoy;
