import axios from "axios";

import config from "./config";
const { NAVER_BOOK_CLIENT_ID, NAVER_BOOK_CLIENT_SECRET } = config;

const naver = axios.create({
  baseURL: "https://openapi.naver.com/v1/search/book.json?query=",
  withCredentials: false,
  headers: {
    "X-Naver-Client-Id": NAVER_BOOK_CLIENT_ID,
    "X-Naver-Client-Secret": NAVER_BOOK_CLIENT_SECRET,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  },
});

export default (bookTitle) =>
   naver.get(`${bookTitle}&display=10&start=1`).catch((error) => {
    console.error(error);
  });
