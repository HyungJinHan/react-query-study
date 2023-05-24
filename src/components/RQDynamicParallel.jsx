import React from "react";
import { useDynamicParallel } from "../hooks/useDynamicParallel";

const RQDynamicParallel = ({ ids }) => {
  const data = useDynamicParallel({ ids });

  return (
    <div style={{ alignItems: "center" }}>
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>React-Query Dynamic Parallel</h2>
        {data?.map((res, index) => {
          return (
            <div style={{ paddingBottom: ".5rem" }} key={index}>
              <span>
                <b>Temperature : </b>
              </span>
              <span>{res.data?.temperature.toFixed(2)}℃</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RQDynamicParallel;
