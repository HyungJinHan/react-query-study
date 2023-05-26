import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/buoy">Buoy Info</Link>
        </li>
        <li>
          <Link to="/rq-buoy">RQ Buoy Info</Link>
        </li>
        <li>
          <Link to="/rq-dynamic-parallel">RQ Dynamic Parallel</Link>
        </li>
        <li>
          <Link to="/rq-hero">RQ Hero Data</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
