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
  const { status, data, error, isFetching } = useBuoyOxygen(id, pageNum);

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
        <h2>Oxygen Data Error : {error.message}</h2>
      </div>
    );
  }

  return (
    <div style={{ alignItems: "center" }}>
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>
          <span>
            {serialNumber}
            {deviceID} Oxygen Data
          </span>
        </h2>

        {data?.map((res, index) => {
          return (
            <div
              key={index}
              style={{
                paddingBottom: ".625rem",
                paddingTop: ".625rem",
              }}
            >
              <div style={{ paddingBottom: ".5rem" }}>
                <span>
                  <b>Sensor Serial Number : </b>
                </span>
                <span>
                  {res?.serial_number}
                  {deviceID}
                </span>
              </div>

              <div style={{ paddingBottom: ".5rem" }}>
                <span>
                  <b>Water Temperature : </b>
                </span>
                {res?.temperature === undefined ? (
                  <span>N/A</span>
                ) : (
                  <span>{(res?.temperature).toFixed(2)}℃</span>
                )}
              </div>

              <div style={{ paddingBottom: ".5rem" }}>
                <span>
                  <b>Oxygen Percent : </b>
                </span>
                {res?.temperature === undefined ? (
                  <span>N/A</span>
                ) : (
                  <span>{(res?.oxygen_per).toFixed(2)}%</span>
                )}
              </div>

              <div style={{ paddingBottom: ".5rem" }}>
                <span>
                  <b>Dissolved Oxygen : </b>
                </span>
                {res?.temperature === undefined ? (
                  <span>N/A</span>
                ) : (
                  <span>{(res?.oxygen_ppm).toFixed(2)}ppm</span>
                )}
              </div>

              <div style={{ paddingBottom: ".5rem" }}>
                <span>
                  <b>Measured Time : </b>
                </span>
                <span>{res?.measured_time}</span>
              </div>

              <div style={{ paddingBottom: ".5rem" }}>
                <span>
                  <b>Location : </b>
                </span>
                {res?.location?.address === undefined ? (
                  <span>N/A</span>
                ) : (
                  <span>{res?.location?.address}</span>
                )}
              </div>
            </div>
          );
        })}
        <div style={{ marginBottom: ".625rem" }}>
          <button
            onClick={() => setPageNum((page) => page - 1)}
            disabled={pageNum === 1}
          >
            &lt;
          </button>
          <span style={{ padding: "0px 10px 0px 10px" }}>{pageNum}</span>
          <button
            onClick={() => setPageNum((page) => page + 1)}
            disabled={nextPage === null || undefined || ""}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RQOdnBuoyOxygen;
