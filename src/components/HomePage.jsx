import React from "react";

const HomePage = () => {
  return (
    <div style={{ width: "95%", margin: "0 auto" }}>
      <h2>Main Page</h2>

      <div style={{ paddingBottom: ".5rem" }}>
        <a
          href="https://api.odn-it.com/devices/"
          target="_blank"
          rel="noreferrer"
        >
          ODN Buoy Data API
        </a>
      </div>

      <div style={{ paddingBottom: ".5rem" }}>
        <a
          href="https://api.odn-it.com/devices/10/oxygens/"
          target="_blank"
          rel="noreferrer"
        >
          ODN Buoy Oxygen Data API
        </a>
      </div>

      <div style={{ paddingBottom: ".5rem" }}>
        <a
          href="https://hyungjinhan.notion.site/React-Query-e363a8a41e7c4a94808a319dd9603565"
          target="_blank"
          rel="noreferrer"
        >
          React-Query Information Notion
        </a>
      </div>
    </div>
  );
};

export default HomePage;
