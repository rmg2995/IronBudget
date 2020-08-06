import React, { Component } from "react";
import "../styles/navbar.scss";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Logo from "../images/iron-budget-logo.png";
// import Search from "./Search/search";

class Navbar extends Component {
  state = {
    showForm: false,
  };
  toggleSearchBar = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };

  displayAllFoods = () => {
    if (this.props.foods.length) {
      return this.props.foods.map((eachFood) => {
        return (
          <div>
            <Link to={`/foods/${eachFood.recipe.label}`}>
              {eachFood.recipe.label}
              <br />
              <img src={eachFood.recipe.image} />
            </Link>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <div className="navbar-phone">
          {console.log(this.props)}
          <Link to="/">
            <img src={Logo} alt="iron-budget-logo" />
          </Link>

          <Menu right>
            <Link className="menu-item" to="/">
              Home
            </Link>

            <Link className="menu-item" to="/sign-up">
              Sign Up
            </Link>

            <Link className="menu-item" to="/log-in">
              Log in
            </Link>

            {/* <Link className="menu-item" to="/profile">
              Profile
            </Link> */}
            <Link className="menu-item" to="/transactions">
              Transactions
            </Link>
            <Link className="menu-item" to="/add-transactions">
              Add Transactions
            </Link>
            <Link className="menu-item" to="/meet-team">
              Meet The Team
            </Link>
          </Menu>
        </div>
        {/* {this.displayAllFoods()} */}
      </div>
    );
  }
}

export default Navbar;
