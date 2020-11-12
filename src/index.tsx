import React from 'react';
import ReactDOM from 'react-dom';

import './css /bootstrap.css'

import { Header } from "./components/Header";
import { MainComponent } from "./components/Mainblock";
import { AppState } from './utils/global-context';
import { GState } from './utils/global-context-types';
import { userReducer } from './utils/state-reducers';

// localStorage.clear()

if (localStorage.getItem("Column0") === null) {
  localStorage.setItem("Column0", "{\"name\":\"TODO\",\"cards\":[]}");
  localStorage.setItem("Column1", "{\"name\":\"In Progress\",\"cards\":[]}");
  localStorage.setItem("Column2", "{\"name\":\"Testing\",\"cards\":[]}");
  localStorage.setItem("Column3", "{\"name\":\"Done\",\"cards\":[]}");
}

const initialState: GState = {
  user: "",
  columns: [{ id: 0, name: "TODO" }, { id: 0, name: "TODO" }, { id: 0, name: "TODO" }, { id: 0, name: "TODO" }],
  cards: [],
  comments: []
}

ReactDOM.render(
  <React.StrictMode>
    <AppState
      initialState={
        localStorage.getItem("state") === null ?
          initialState :
          JSON.parse(localStorage.getItem("state") as string)}
      userReducer={userReducer}>
      <Header />
      <MainComponent />
    </AppState>
  </React.StrictMode>,
  document.getElementById('root')
);
