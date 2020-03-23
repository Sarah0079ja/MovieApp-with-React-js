import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Route from "react-router-dom/Route";

import AppNavbar from './components/AppNavbar';
import Landing from "./components/Landing";

import MovieDetail from './components/MovieDetail/MovieDetail';
import FavoritePage from "./components/FavoritePage/FavoritePage";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

// import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppNavbar />
          <div
            className="App"
            style={{ paddingTop: "75px", minHeight: "calc(100vh -80px)" }}
          >
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/movie/:movieId" component={MovieDetail} />
              <Route exact path="/favorite" component={FavoritePage} />
            </Switch>
            {/* <Landing /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
