import React from 'react';
import ReactDOM from 'react-dom';

//This is bad. Link not working from index.html
import './css /bootstrap.css'

import {HeaderElement} from "./components/HeaderElement";
import {MainComponent} from "./components/MainBlock";

ReactDOM.render(
  <React.StrictMode>
      <HeaderElement/>
      <MainComponent/>
  </React.StrictMode>,
  document.getElementById('root')
);
