import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SuperHeroes from "./components/SuperHeroes";
import RQSuperHeroes from "./components/RQSuperHeroes";
import HomePage from "./components/HomePage";
import { Fragment } from "react";
import Nav from "./components/Nav";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/super-heroes" element={<SuperHeroes />} />
        <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
      </Routes>
    </Fragment>
  );
}

export default App;
