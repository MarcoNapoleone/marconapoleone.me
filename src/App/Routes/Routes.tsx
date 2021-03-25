// @ts-ignore
import {
  Route, Redirect, BrowserRouter as Router, Switch as DefaultSwitch
} from 'react-router-dom';
import React from 'react';
import Theme from "../Theme/Theme";
import Home from "../Home/Home";

const Routes: React.FC = () => {
  return (
    <Theme>
      <Router>
        <DefaultSwitch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/">
            <Redirect to="/home"/>
          </Route>
        </DefaultSwitch>
      </Router>
    </ Theme>
  );
}

export default Routes;
