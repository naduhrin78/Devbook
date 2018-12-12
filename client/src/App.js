import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import "./App.css";
import store from "./store";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Footer from "./components/layout/footer";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import setAuthToken from "./utility/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

if (localStorage.jwtToken) {
  // Configure token to be required for any protected route access
  setAuthToken(localStorage.jwtToken);

  // Dispatch login user
  store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
