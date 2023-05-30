import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHeroes, useNextHeroes } from "../hooks/useHeroes";
import { useAddHero, useDeleteHero } from "../hooks/useMutation";

const RQHeroes = () => {
  const [pageNum, setPageNum] = useState(1);
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { status, data, error, isFetching, refetch } = useHeroes(pageNum);
  const { data: NextData } = useNextHeroes(pageNum);
  const { mutate: addHero } = useAddHero(pageNum);
  const { mutate: deleteHero } = useDeleteHero();

  const handleAddHero = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  const handleDeleteHero = (id) => {
    deleteHero(id);
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
    <div style={{ alignItems: "center" }}>
      <div style={{ width: "95%", margin: "0 auto" }}>
        <h2>React-Query Hero Data</h2>

        <div style={{ paddingBottom: "1.25rem" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginRight: ".625rem" }}
          />
          <input
            type="text"
            value={alterEgo}
            onChange={(e) => setAlterEgo(e.target.value)}
            style={{ marginRight: ".625rem" }}
          />

          <button
            onClick={() => {
              handleAddHero();
              setName("");
              setAlterEgo("");
            }}
          >
            Add Hero
          </button>
        </div>

        <div style={{ marginBottom: ".625rem" }}>
          <button onClick={refetch}>Fetch Data</button>
        </div>
        {data?.map((hero) => {
          return (
            <div
              key={hero.id}
              style={{ paddingBottom: ".625rem", paddingTop: ".625rem" }}
            >
              <div style={{ paddingBottom: ".5rem" }}>
                <span>
                  <b>{hero.id}.&nbsp;</b>
                  <Link to={`/rq-hero/${hero.id}`} state={pageNum}>
                    <b>{hero.name}</b>
                  </Link>
                </span>
                <button
                  style={{ marginLeft: ".625rem" }}
                  onClick={() => handleDeleteHero(hero.id)}
                >
                  Delete Hero
                </button>
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
            disabled={NextData?.length < 1}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RQHeroes;
