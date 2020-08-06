import React from "react";
import actions from "../../services/index";
import { GoogleLogin } from "react-google-login";

const responseGoogle = (props) => {
  console.log(props);
  const onResponse = (response) => {
    console.log(response);
    const user = {
      ...response.profileObj,
      password: response.profileObj?.googleId,
    };
    actions
      .signUp(user)
      .then((user) => {
        props.setUser({ ...user.data });
      })
      .catch(({ response }) => console.error(response.data));
  };
  return (
    <GoogleLogin
      clientId="956237608940-rkcol4ero2rjnoitf08okr0nbkvjjgq8.apps.googleusercontent.com"
      buttonText="Signup"
      onSuccess={onResponse}
      onFailure={onResponse}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default responseGoogle;
