import React from 'react';
import ReactDOM from 'react-dom';

//This is bad. Link not working from index.html
import './css /bootstrap.css'

import {Header} from "./components/header/";
import {MainComponent} from "./components/mainblock";
import {LoginPopup} from "./components/loginpopup";

//For test purpose
localStorage.clear()

// localStorage.setItem("user", "Test user")
// localStorage.setItem("boardContent", '{"s": ["test", "test"]}')

ReactDOM.render(
  <React.StrictMode>
      <Header/>
      <MainComponent/>
      {/*Not sure about popup position in code */}
      <LoginPopup/>
  </React.StrictMode>,
  document.getElementById('root')
);
