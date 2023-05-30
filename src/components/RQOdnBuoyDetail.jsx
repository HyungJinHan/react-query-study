import React from "react";
import { Link, useParams } from "react-router-dom";
import { useBuoyDetail } from "../hooks/useBuoyDetail";

const RQOdnBuoyDetail = () => {
  const { id } = useParams();
  const { status, data, error, isFetching } = useBuoyDetail(id);

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
        <h2>Buoy Data Error : {error.message}</h2>
      </div>
    );
  }

  return (
    <div style={{ width: "95%", margin: "0 auto" }}>
      <h2>
        <span>
          {data?.serial_number}
          {data?.device_id}
        </span>
      </h2>

      <div style={{ paddingBottom: "1.25rem", paddingTop: "1.25rem" }}>
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
            <b>Operating State </b>
          </span>
          <div
            style={{
              width: ".75rem",
              height: ".75rem",
              borderRadius: "100%",
              backgroundColor: data?.operating_state === true ? "green" : "red",
              display: "inline-flex",
              marginLeft: ".3125rem",
            }}
          />
        </div>

        <div>
          <p>
            <Link
              to={`/rq-buoy/${id}/oxygen`}
              state={{
                id: id,
                deviceID: data?.device_id,
                serialNumber: data?.serial_number,
              }}
            >
              <b>
                {data?.serial_number}
                {data?.device_id} Oxygen Data (Pagenation)
              </b>
            </Link>
          </p>

          <p>
            <Link
              to={`/rq-buoy/${id}/oxygen/infinite`}
              state={{
                id: id,
                deviceID: data?.device_id,
                serialNumber: data?.serial_number,
              }}
            >
              <b>
                {data?.serial_number}
                {data?.device_id} Oxygen Data (Infinite)
              </b>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RQOdnBuoyDetail;
