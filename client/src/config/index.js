import dotenv from "dotenv";
dotenv.config();

export default {
  REACT_APP_BASIC_SERVER_URL: process.env.REACT_APP_BASIC_SERVER_URL,
  NAVER_BOOK_CLIENT_ID: process.env.NAVER_BOOK_CLIENT_ID,
  NAVER_BOOK_CLIENT_SECRET: process.env.NAVER_BOOK_CLIENT_SECRET,
};
