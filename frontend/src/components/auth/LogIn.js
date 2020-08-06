import React, { Component, Fragment } from "react";
import actions from "../../services/index";

class LogIn extends Component {
  state = {};
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    actions
      .logIn(this.state)
      .then((user) => {
        this.props.setUser({ ...user.data });
      })
      .catch(({ response }) => console.error(response.data));
  };
  render() {
    return (
      <Fragment>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <p> Email:</p>
          <input
            placeholder="email"
            name="email"
            type="email"
            onChange={this.handleChange}
          />
          <br />
          <p>Password:</p>
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" className="submit-button" value="Log In" />
        </form>
      </Fragment>
    );
  }
}

export default LogIn;
