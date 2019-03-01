import React, {Component} from 'react';
import './App.css';
import {ConnectedRouter} from "connected-react-router";
import configureStore, {history} from "./store";
import {Route, Switch} from "react-router";
import {Provider} from "react-redux";
import {Home} from "./pages/home";

const store = configureStore({});

export default class App extends Component {
  render() {
    return <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/foo">
            <Home message={<div>hello</div>}/>
          </Route>
          <Route>
            <div>Miss</div>
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  }
}
