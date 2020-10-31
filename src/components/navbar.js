import React, { Component, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./ContextProvider";
const Navbar = (props) => {
  const [userData, setUserData] = useContext(UserContext);
  console.log("user", userData.user);
  const history = useHistory();
  const register = () => {
    history.push("/register");
  };
  const login = () => {
    history.push("/login");
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.removeItem("auth-token");
    history.push("/login");
  };
  return (
    <div style={{ width: "100%", backgroundColor: "gray" }}>
      {userData.user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
