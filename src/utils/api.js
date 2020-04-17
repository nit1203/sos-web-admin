import { API_URL } from "../variables/constants";

export const swrFetcher = (url) =>
  fetch(`${API_URL}${url}`).then((response) => response.json());

export const fetcher = ({ url, type = "json", ...args }) =>
  fetch(`${API_URL}${url}`, {
    ...args,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    console.log("type", type);
    return type === "text" ? res.text() : res.json();
  });
