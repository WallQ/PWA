import * as axios from "axios";
//import { getCookie } from "./utils";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }

  init = () => {
    //this.api_token = getCookie("token");

    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      //baseURL: this.api_url,
      baseURL: "",
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getRoomType = (idRoomType) => {
    //return this.init().get("/users", { params: idRoomType });
    const url = '/roomTypes/' + idRoomType;
    return this.init().get(url);
  };

  addNewUser = (data) => {
    return this.init().post("/users", data);
  };
}