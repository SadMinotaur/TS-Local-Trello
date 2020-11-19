import React from "react";
import ReactDOM from "react-dom";

import "./css /bootstrap.css";

import { Header } from "./components/Header";
import { MainComponent } from "./components/Mainblock";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <MainComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
