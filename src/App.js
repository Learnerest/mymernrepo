import logo from "./logo.svg";
import React, { Component, useEffect, useState } from "react";
import "./App.css";
import HomePage from "./components/homepage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import LoginPage from "./components/loginpage";
import RegisterPage from "./components/registerpage";
import Navbar from "./components/navbar";
import axios from "./components/axios";
import UserContext from "./components/ContextProvider";
function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [isUser, setisUser] = useState();
  useEffect(() => {
    console.log("heyy");
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("user/isvalid", null, {
        headers: {
          "x-auth-token": token,
        },
      });

      if (tokenRes.data) {
        await axios
          .get("user/", {
            headers: {
              "x-auth-token": token,
            },
          })
          .then((res) =>
            setUserData({
              token,
              user: {
                id: res.data.id,
                email: res.data.email,
                name: res.data.name,
              },
            })
          )
          .catch((err) => console.log(err));
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <React.Fragment>
      <UserContext.Provider value={[userData, setUserData]}>
        <Router>
          <Navbar isuser={isUser}></Navbar>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
