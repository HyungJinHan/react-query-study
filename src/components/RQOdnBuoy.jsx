import React from "react";
import { useBuoy } from "../hooks/useBuoy";
import { Link } from "react-router-dom";

const RQOdnBuoy = () => {
  const { status, data, error, isFetching, refetch } = useBuoy();

  if (isFetching) {
    return (
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  /** 아래 코드로 에러 핸들링 끝 */
  if (status === "error") {
    // status -> success, loading, error...
    return (
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>Error : {error.message}</h2>
      </div>
    );
  }

  return (
    <div style={{ alignItems: "center" }}>
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>React-Query ODN Buoy Infomation</h2>
        {/* <button onClick={refetch}>Fetch Data</button> */}
        {data?.map((allData) => {
          return (
            <div
              key={allData.device_id}
              style={{ paddingBottom: ".625rem", paddingTop: ".625rem" }}
            >
              <div style={{ paddingBottom: ".5rem" }}>
                <span>
                  <b>Device ID : </b>
                </span>
                <span>
                  <Link to={`/rq-buoy/${allData.device_id}`}>
                    {allData.serial_number}
                    {allData.device_id}
                  </Link>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RQOdnBuoy;
