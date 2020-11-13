import React from 'react';
import ReactDOM from 'react-dom';

import './css /bootstrap.css'

import { Header } from "./components/Header";
import { MainComponent } from "./components/Mainblock";
import { AppState } from './components/AppContext/GlobalContext';
import { AState } from './utils/global-context-types';
import { mainReducer } from './utils/state-reducers';

localStorage.clear()

if (localStorage.getItem("Column0") === null) {
  localStorage.setItem("Column0", "{\"name\":\"TODO\",\"cards\":[]}");
  localStorage.setItem("Column1", "{\"name\":\"In Progress\",\"cards\":[]}");
  localStorage.setItem("Column2", "{\"name\":\"Testing\",\"cards\":[]}");
  localStorage.setItem("Column3", "{\"name\":\"Done\",\"cards\":[]}");
}

const initialState: AState = {
  user: "",
  columns: [{ id: 0, name: "TODO" }, { id: 1, name: "In Progress" }, { id: 2, name: "Testing" }, { id: 3, name: "DONE" }],
  cards: [],
  comments: []
}

ReactDOM.render(
  <React.StrictMode>
    <AppState
      initialState={localStorage.getItem("state") === null ? initialState : JSON.parse(localStorage.getItem("state") as string)}
      reducer={mainReducer}>
      <Header />
      <MainComponent />
    </AppState>
  </React.StrictMode>,
  document.getElementById('root')
);
