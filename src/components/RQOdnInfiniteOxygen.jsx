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

        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group?.data.results.map((res, index) => {
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
            </Fragment>
          );
        })}
        <div style={{ marginBottom: ".625rem" }}>
          <button
            disabled={nextPage === null || "" || undefined}
            onClick={() => {
              fetchNextPage();
              setPageNum(pageNum + 1);
            }}
          >
            Load More
          </button>
        </div>

        <div style={{ marginBottom: ".625rem" }}>
          {isFetching && !isFetchingNextPage ? "Fetching..." : null}
        </div>
      </div>
    </div>
  );
};

export default RQOdnInfiniteOxygen;
