import React from 'react';
import ReactDOM from 'react-dom';

//This is bad. Link not working from index.html
import './css /bootstrap.css'

import {Header} from "./components/header/";
import {MainComponent} from "./components/mainblock";
import {LoginPopup} from "./components/loginpopup";

//For testing purposes
localStorage.clear()

// localStorage.setItem("user", "Test user");
localStorage.setItem("Column0", "{\"name\":\"TODO\",\"cards\":[]}");
localStorage.setItem("Column1", "{\"name\":\"In Progress\",\"cards\":[]}");
localStorage.setItem("Column2", "{\"name\":\"Testing\",\"cards\":[]}");
localStorage.setItem("Column3", "{\"name\":\"Done\",\"cards\":[]}");

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <MainComponent/>
    <LoginPopup/>
  </React.StrictMode>,
  document.getElementById('root')
);
