import { SERVICE_URL } from "../../constants";

const makeHeaders = (downloadFile) => {
  const token = localStorage.getItem("token");
  // console.log(token);

  if(downloadFile){
    return {
      Accept: "text/csv",
      "Content-Type": "application/json",
      Authorization: token,
    };
  }

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token,
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

export const getRequest = async (path, data) => {
  const URI = SERVICE_URL + path;

  let requestData = {}

  if(data && data.downloadFile){
    return window.open(URI, '_blank');
  }else{
    if(data && data.isDelete){
      requestData = {
        method: "DELETE",
        headers: makeHeaders()
      };
    }else{
      requestData = {
        method: "GET",
        headers: makeHeaders()
      };
    }
  }
  
  if( data && data.downloadFile){
    return await fetch(URI, requestData)
    .then((res) => {
      const statusCode = res.status;
      const data = res.text();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      return { data: data, statusCode: statusCode };
    })
    .catch((e) => console.log(e));
  }

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
