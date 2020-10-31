import React, { Component, useEffect, useState, useContext } from "react";
import axios from "./axios";
import { useHistory } from "react-router-dom";
import UserContext from "./ContextProvider";

const LoginPage = (props) => {
  console.log("bakalım", props.value);
  const [userData, setUserData] = useContext(UserContext);

  const history = useHistory();
  const [currentData, setCurrentData] = useState({
    email: undefined,
    password: undefined,
  });
  useEffect(async () => {
    console.log(currentData.email);
    console.log(currentData.password);

    console.log("runend");
    if (currentData.email !== undefined) {
      await axios
        .post(
          "user/login",
          {
            email: currentData.email,
            password: currentData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (res) => {
          const token = res.data.token;
          localStorage.setItem("auth-token", res.data.token);
          console.log("login");
          await setUserData({
            token,
            user: {
              id: res.data.user.id,
              email: res.data.user.email,
              name: res.data.user.displayName,
            },
          });
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [currentData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentData({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" />
        <input name="password" type="password" />
        <button type="submit">Handle Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
