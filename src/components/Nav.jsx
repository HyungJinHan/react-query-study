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
          <Link to="/buoy">ODN Buoy Infomation</Link>
        </li>
        <li>
          <Link to="/rq-buoy">RQ ODN Buoy</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
