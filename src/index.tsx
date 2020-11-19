import React from "react";
import ReactDOM from "react-dom";

import "./css /bootstrap.css";

import { Header } from "./components/Header";
import { MainComponent } from "./components/Mainblock";
import { Provider } from "react-redux";
import { store } from "./utils/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <MainComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
