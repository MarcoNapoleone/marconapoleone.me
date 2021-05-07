// @ts-ignore
import {
  Route, Redirect, BrowserRouter as Router, Switch as DefaultSwitch
} from 'react-router-dom';
import React, {useEffect} from 'react';
import Theme from "../Theme/Theme";
import Home from "../Home/Home";
import {authenticateAnonymously} from "../../services/firestore";

const Routes: React.FC = () => {
  useEffect(() => {
    authenticateAnonymously().then(() => {});
  }, []);
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
