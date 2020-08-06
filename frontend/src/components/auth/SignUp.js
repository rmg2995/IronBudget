import React, { Component, Fragment } from "react";
import actions from "../../services/index";

class SignUp extends Component {
  state = {};
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    console.log("signup called");
    e.preventDefault();
    actions
      .signUp(this.state)
      .then((user) => {
        this.props.setUser({ ...user.data });
      })
      .catch(({ response }) => console.error(response.data));
  };
  render() {
    return (
      <Fragment>
        <h2>SignUP</h2>
        <form onSubmit={this.handleSubmit}>
          <p>Email:</p>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <br />
          <p>Password:</p>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" className="submit-button" value="Sign Up" />
        </form>
      </Fragment>
    );
  }
}

export default SignUp;
