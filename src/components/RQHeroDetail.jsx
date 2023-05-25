import React from "react";
import { useParams } from "react-router-dom";
import { useHeroDetail } from "../hooks/useHeroDetail";

const RQHeroDetail = () => {
  const { id } = useParams();
  const { status, data, error, isFetching } = useHeroDetail(id);

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
        <h2>{data.name}'s Infomation</h2>
        <div
          key={data.id}
          style={{ paddingBottom: ".625rem", paddingTop: ".625rem" }}
        >
          <div style={{ paddingBottom: ".5rem" }}>
            <span>
              <b>{data.name}</b> is {data.alterEgo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RQHeroDetail;
