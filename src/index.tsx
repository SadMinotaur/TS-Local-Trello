import React from 'react';
import ReactDOM from 'react-dom';

//This is bad. Link not working from index.html
import './css /bootstrap.css'

import {HeaderElement} from "./components/headerelement/HeaderElement";
import {MainComponent} from "./components/mainblock/MainBlock";
import {LoginPopup} from "./components/loginpopup";


//For test purpose
localStorage.clear()

// localStorage.setItem("user", "Test user")
// localStorage.setItem("boardContent", '{"s": ["test", "test"]}')

ReactDOM.render(
  <React.StrictMode>
      <HeaderElement/>
      <MainComponent/>
      {/*Not sure about popup position in code */}
      <LoginPopup/>
  </React.StrictMode>,
  document.getElementById('root')
);
