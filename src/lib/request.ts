
import { AxiosError, AxiosInstance  } from "axios";
import { CrExRequestArgs, CrExResponse } from "../index";

const cacheError = (error: AxiosError, reject: any): void => {
  let msg = error.message;

  if (error.response) {
    if (error.response.data && error.response.data.message) {
      msg = error.response.data.message;
    }
  }

  if (error.request) {
    if (error.request.data && error.request.data.message) {
      msg = error.request.data.message;
    }
  }

  if (error.code === "ECONNREFUSED") {
    msg = `Error: ${error.code} - Cannot connect to AEM`;
  }

  reject(msg);
};

export const doGet = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
  new Promise((resolve, reject) => {
    instance
      .get(url, { params })
      .then((res) => resolve(res.data))
      .catch((err) => cacheError(err, reject));
  })
);

export const doPost = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
  new Promise((resolve, reject) => {
    instance
      .post(url, params, { params })
      .then((res) => resolve(res.data))
      .catch((err) => cacheError(err, reject));
  })
);

export const doDelete = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
  new Promise((resolve, reject) => {
    instance
      .delete(url, { params })
      .then((res) => resolve(res.data))
      .catch((err) => cacheError(err, reject));
  })
);

export const doUpload = (url: string, data: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
  new Promise((resolve, reject) => {
    let file;

    if (typeof process === "object") {
      const FD = require("form-data");
      file = new FD();
    } else {
      file = new FormData();
    }

    file.append("file", data.file);

    instance
      .post(url,
        file,
        { headers: file.getHeaders() },
      )
      .then((res) => resolve(res.data))
      .catch((err) => cacheError(err, reject));
  })
);

export const doDownload = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
  new Promise((resolve, reject) => {
    instance
      .get(url, {
        params,
        responseType: "arraybuffer",
      })
      .then((res) => resolve(res.data))
      .catch((err) => cacheError(err, reject));
  })
);
