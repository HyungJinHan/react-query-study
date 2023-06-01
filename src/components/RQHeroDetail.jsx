import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useHeroDetail } from "../hooks/useHeroDetail";
import { useUpdateHero } from "../hooks/useMutation";

const RQHeroDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const pageNum = location.state;
  const { status, data, error, isFetching } = useHeroDetail(id, pageNum);
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
    updateHero(id, hero, pageNum);
  };

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
    <div style={{ width: "95%", margin: "0 auto" }}>
      {updateToggle === false ? (
        <>
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

          <button onClick={() => setUpdateToggle(!updateToggle)}>Update</button>
        </>
      ) : (
        <>
          <h2>Update {data.name}'s Infomation</h2>
          <div
            key={data.id}
            style={{ paddingBottom: ".625rem", paddingTop: ".625rem" }}
          >
            <div style={{ paddingBottom: ".5rem" }}>
              <span>
                <input
                  type="text"
                  defaultValue={data.name}
                  name="name"
                  onChange={handleChange}
                />
                &nbsp;is&nbsp;
                <input
                  type="text"
                  defaultValue={data.alterEgo}
                  name="alterEgo"
                  onChange={handleChange}
                />
              </span>
            </div>
          </div>

          <button
            style={{ marginRight: ".625rem" }}
            onClick={() => {
              handleUpdate();
              setUpdateToggle(!updateToggle);
            }}
          >
            Confirm
          </button>

          <button onClick={() => setUpdateToggle(false)}>Cancle</button>
        </>
      )}
    </div>
  );
};

export default RQHeroDetail;
