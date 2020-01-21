
import { AxiosInstance } from "axios";
import { CrExRequestArgs, CrExResponse } from "../index";

export const doGet = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
  new Promise((resolve, reject) => {
    instance
      .get(url, { params })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data.message));
  })
);

export const doPost = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
  new Promise((resolve, reject) => {
    instance
      .post(url, undefined, { params })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data.message));
  })
);

export const doDelete = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
  new Promise((resolve, reject) => {
    instance
      .delete(url, { params })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data.message));
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
      .catch((err) => reject(err.response.data.message));
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
      .catch((err) => reject(err.response.data.message));
  })
);
