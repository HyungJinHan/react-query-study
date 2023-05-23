import React from "react";
import { useParams } from "react-router-dom";
import { useBuoyDetail } from "../hooks/useBuoyDetail";
import { useBuoyOxygen } from "../hooks/useBuoyOxygen";

const RQOdnBuoyDetail = () => {
  const { id } = useParams();
  const { status, data, error, isFetching } = useBuoyDetail(id);
  const {
    status: Ostaus,
    data: Odata,
    error: Oerror,
    isFetching: OisFetching,
  } = useBuoyOxygen(id);

  if (isFetching || OisFetching) {
    return (
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  /** 아래 코드로 에러 핸들링 끝 */
  if (status === "error" || Ostaus === "error") {
    // status -> success, loading, error...
    return (
      <div style={{ width: "95%", margin: "0 auto" }}>
        {status === "error" ? (
          <h2>Buoy Data Error : {error.message}</h2>
        ) : (
          <h2>Oxygen Data Error : {Oerror.message}</h2>
        )}
      </div>
    );
  }

  return (
    <div style={{ alignItems: "center" }}>
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>
          <span>
            {data?.serial_number}
            {data?.device_id}
          </span>
        </h2>

        <div
          key={data?.device_id}
          style={{ paddingBottom: "1.25rem", paddingTop: "1.25rem" }}
        >
          <div style={{ paddingBottom: ".5rem" }}>
            <span>
              <b>Device Type : </b>
            </span>
            <span>{data?.device_type}</span>
          </div>

          <div style={{ paddingBottom: ".5rem" }}>
            <span>
              <b>Battery : </b>
            </span>
            <span>{data?.battery}%</span>
          </div>

          <div style={{ paddingBottom: ".5rem" }}>
            <span>
              <b>Owner : </b>
            </span>
            <span>{data?.owner}</span>
          </div>

          <div style={{ paddingBottom: ".5rem" }}>
            <span>
              <b>Oxygen Sensor Serial Number : </b>
            </span>
            <span>
              {Odata?.serial_number}
              {data?.device_id}
            </span>
          </div>

          <div style={{ paddingBottom: ".5rem" }}>
            <span>
              <b>Temperature : </b>
            </span>
            {Odata?.temperature === undefined ? (
              <span>N/A</span>
            ) : (
              <span>{(Odata?.temperature).toFixed(2)}℃</span>
            )}
          </div>

          <div style={{ paddingBottom: ".5rem" }}>
            <span>
              <b>Location : </b>
            </span>
            {Odata?.location?.address === undefined ? (
              <span>N/A</span>
            ) : (
              <span>{Odata?.location?.address}</span>
            )}
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
                  data?.operating_state === true ? "green" : "red",
                display: "inline-flex",
                marginLeft: ".3125rem",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RQOdnBuoyDetail;
