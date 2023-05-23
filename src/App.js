import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Fragment } from "react";
import Nav from "./components/Nav";
import OdnBuoy from "./components/OdnBuoy";
import RQOdnBuoy from "./components/RQOdnBuoy";
import RQOdnBuoyDetail from "./components/RQOdnBuoyDetail";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buoy" element={<OdnBuoy />} />
        <Route path="/rq-buoy" element={<RQOdnBuoy />} />
        <Route path="/rq-buoy/:id" element={<RQOdnBuoyDetail />} />
      </Routes>
    </Fragment>
  );
}

export default App;
