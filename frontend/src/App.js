import Navbar from "./components/Nav/Navbar";
import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./services/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import Form from "./components/Form.jsx";
import Transactions from "./components/Transactions";
import MeetTeam from "./components/MeetTeam";
console.log(process.env);
class App extends Component {
  state = {};

  async componentDidMount() {
    let user = await actions.isLoggedIn();
    this.setState({ ...user.data });
    console.log("coolest ", user);
  }

  setUser = (user) => this.setState(user);

  logOut = async () => {
    console.log("logged out");
    let res = await actions.logOut();
    this.setUser({ email: null, createdAt: null, updatedAt: null, _id: null }); //FIX
  };

  passData = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div className="form-body">
        <BrowserRouter>
          <Navbar />
          {/* <Form userId={this.state}></Form> */}

          {/* {this.state.email} */}
          <nav>
            {/* <NavLink to="/">Home |</NavLink> */}

            {this.state.email ? (
              <Fragment>
                <h3>Welcome Back, {this.state.email}!</h3>
                <NavLink className="nav-links" onClick={this.logOut} to="/">
                  Log Out
                </NavLink>
                {/* <NavLink className="nav-links" to="/profile">
                  {" "}
                  P
                </NavLink> */}
              </Fragment>
            ) : (
              <Fragment>
                <NavLink className="nav-links" to="/sign-up">
                  Sign Up |
                </NavLink>
                <NavLink className="nav-links" to="/log-in">
                  Log In{" "}
                </NavLink>
              </Fragment>
            )}
            <br />
            {!this.state.email && <GoogleAuth setUser={this.setUser} />}
            {!this.state.email && <GoogleAuthLogin setUser={this.setUser} />}
          </nav>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} userId={this.state} />}
            />
            <Route
              exact
              path="/sign-up"
              render={(props) => <SignUp {...props} setUser={this.setUser} />}
            />
            <Route
              exact
              path="/log-in"
              render={(props) => <LogIn {...props} setUser={this.setUser} />}
            />
            <Route
              exact
              path="/profile"
              render={(props) => <Profile {...props} user={this.state} />}
            />
            <Route
              exact
              path="/add-transactions"
              render={(props) => <Form {...props} userId={this.state} />}
            />
            <Route
              exact
              path="/transactions"
              render={(props) => (
                <Transactions
                  {...props}
                  user={this.state}
                  passData={this.passData}
                />
              )}
            />
            <Route exact path="/meet-team" render={() => <MeetTeam />} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
