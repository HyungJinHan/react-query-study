import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";

import HomePage from "./components/HomePage";
import Nav from "./components/Nav";
import OdnBuoy from "./components/OdnBuoy";
import RQOdnBuoy from "./components/RQOdnBuoy";
import RQOdnBuoyDetail from "./components/RQOdnBuoyDetail";
import RQDynamicParallel from "./components/RQDynamicParallel";
import RQHeroes from "./components/RQHeroes";
import RQHeroDetail from "./components/RQHeroDetail";
import RQOdnBuoyOxygen from "./components/RQOdnBuoyOxygen";
import RQOdnInfiniteOxygen from "./components/RQOdnInfiniteOxygen";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buoy" element={<OdnBuoy />} />
        <Route path="/rq-buoy" element={<RQOdnBuoy />} />
        <Route path="/rq-buoy/:id" element={<RQOdnBuoyDetail />} />
        <Route path="/rq-buoy/:id/oxygen" element={<RQOdnBuoyOxygen />} />
        <Route
          path="/rq-buoy/:id/oxygen/infinite"
          element={<RQOdnInfiniteOxygen />}
        />
        <Route
          path="/rq-dynamic-parallel"
          element={<RQDynamicParallel ids={[10, 12]} />}
        />
        <Route path="/rq-hero" element={<RQHeroes />} />
        <Route path="/rq-hero/:id" element={<RQHeroDetail />} />
      </Routes>
    </Fragment>
  );
}

export default App;
