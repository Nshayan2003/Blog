import axios from "axios";

export const BACKEND_URL = "http://localhost:5000";

export const axiosPublic = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicFetcher = (...args) =>
  axiosPublic.get(...args).then((res) => res.data);
