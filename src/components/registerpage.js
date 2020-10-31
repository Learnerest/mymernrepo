import React, { Component, useState, useEffect } from "react";
import axios from "./axios";
import { useHistory } from "react-router-dom";
const RegisterPage = () => {
  const history = useHistory();
  const [currentData, setCurrentData] = useState({
    email: undefined,
    name: undefined,
    password: undefined,
    password2: undefined,
  });
  useEffect(async () => {
    console.log("runend");
    if (currentData.email !== undefined) {
      await axios
        .post(
          "user/register",
          {
            email: currentData.email,
            name: currentData.name,
            password: currentData.password,
            password2: currentData.password2,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => history.push("/login"))
        .catch((err) => alert(err.response.data.msg));
    }
  }, [currentData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentData({
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value,
      password2: e.target.password2.value,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" />
        <input name="name" type="text" />
        <input name="password" type="password" />
        <input name="password2" type="password" />

        <button type="submit">Handle Submit</button>
      </form>
    </div>
  );
};

export default RegisterPage;
