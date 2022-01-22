import { SERVICE_URL } from "../../constants";

const makeHeaders = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Auth: token,
  };
};

const makeBody = (body) => {
  return JSON.stringify(body);
};

export const postRequest = async (path, body) => {
  const URI = SERVICE_URL + path;

  let requestData = {
    method: "POST",
    headers: makeHeaders(),
    body: makeBody(body),
  };

  return await fetch(URI, requestData)
    .then((res) => {
      const statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      return { data: data, statusCode: statusCode };
    })
    .catch((e) => console.log(e));
};

export const getRequest = async (path) => {
  const URI = SERVICE_URL + path;

  let requestData = {
    method: "GET",
    headers: makeHeaders(),
  };

  return await fetch(URI, requestData)
    .then((res) => {
      const statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      return { data: data, statusCode: statusCode };
    })
    .catch((e) => console.log(e));
};
