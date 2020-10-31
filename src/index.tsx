import React from 'react';
import ReactDOM from 'react-dom';

//This is bad. Link not working from index.html
import './css /bootstrap.css'

import {Header} from "./components/header/";
import {MainComponent} from "./components/mainblock";
import {LoginPopup} from "./components/loginpopup";

//For testing purposes
localStorage.clear()

localStorage.setItem("user", "Test user")
localStorage.setItem("boardContent", "{\"boardname\":\"Kanban\",\"columns\":[{\"name\":\"Todo\",\"cards\":[{\"name\":\"test\",\"comments\":[{\"text\":\"test\",\"author\":\"test\"}]}]},{\"name\":\"In Progress\",\"cards\":[{\"name\":\"test\",\"comments\":[{\"text\":\"test\",\"author\":\"test\"}]}]},{\"name\":\"Testing\",\"cards\":[{\"name\":\"test\",\"comments\":[{\"text\":\"test\",\"author\":\"test\"}]}]},{\"name\":\"Done\",\"cards\":[{\"name\":\"test\",\"comments\":[{\"text\":\"test\",\"author\":\"test\"}]}]}]}")

console.log(JSON.parse(localStorage.getItem("boardContent") as string))

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <MainComponent/>
    {/*Not sure about popup position in code */}
    <LoginPopup/>
  </React.StrictMode>,
  document.getElementById('root')
);
