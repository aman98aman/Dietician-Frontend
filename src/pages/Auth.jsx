import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import UserDetailForm from "./UserDetailForm";

const Auth = () => {
  return (
    <div>
      <Login />
      <Signup />
      <UserDetailForm />
    </div>
  );
};

export default Auth;
