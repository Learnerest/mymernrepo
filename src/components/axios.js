import React, { Component } from "react";
import axios from "axios";
const MyAxios = axios.create({
  baseURL: "http://192.168.1.10:8000",
});

export default MyAxios;
