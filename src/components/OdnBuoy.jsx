import React, { useEffect, useState } from "react";
import axios from "axios";

const OdnBuoy = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.odn-it.com/devices/")
      .then((res) => {
        setData(res.data.results);
        setIsLoading(!isLoading);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(!isLoading);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ alignItems: "center" }}>
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>Traditional ODN Buoy Infomation</h2>
        {data.map((res) => {
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
      </div>
    </div>
  );
};

export default OdnBuoy;
