import React from 'react';
import ReactDOM from 'react-dom';

//This is bad. Link not working from index.html
import './css /bootstrap.css'

import {Header} from "./components/header/";
import {MainComponent} from "./components/mainblock";
import {LoginPopup} from "./components/loginpopup";

//For testing purposes
// localStorage.clear()

localStorage.setItem("user", "Test user")
// localStorage.setItem("Column0", "{\"name\":\"TODO\",\"cards\":[{\"name\":\"test\",\"author\":\"test\",\"comments\":[{\"author\":\"test\",\"content\":\"ok\"}]}]}")
// localStorage.setItem("Column1", "{\"name\":\"TODO\",\"cards\":[{\"name\":\"test\",\"author\":\"test\",\"comments\":[{\"author\":\"test\",\"content\":\"ok\"}]}]}")
// localStorage.setItem("Column2", "{\"name\":\"TODO\",\"cards\":[{\"name\":\"test\",\"author\":\"test\",\"comments\":[{\"author\":\"test\",\"content\":\"ok\"}]}]}")
// localStorage.setItem("Column3", "{\"name\":\"TODO\",\"cards\":[{\"name\":\"test\",\"author\":\"test\",\"comments\":[{\"author\":\"test\",\"content\":\"ok\"}]}]}")

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <MainComponent/>
    {/*Not sure about popup position in code */}
    <LoginPopup/>
  </React.StrictMode>,
  document.getElementById('root')
);
