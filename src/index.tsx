import React from 'react';
import ReactDOM from 'react-dom';

import './css /bootstrap.css'

import { Header } from "./components/Header";
import { MainComponent } from "./components/Mainblock";

// localStorage.clear()

if (localStorage.getItem("Column0") === null) {
  localStorage.setItem("Column0", "{\"name\":\"TODO\",\"cards\":[]}");
  localStorage.setItem("Column1", "{\"name\":\"In Progress\",\"cards\":[]}");
  localStorage.setItem("Column2", "{\"name\":\"Testing\",\"cards\":[]}");
  localStorage.setItem("Column3", "{\"name\":\"Done\",\"cards\":[]}");
}

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <MainComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
