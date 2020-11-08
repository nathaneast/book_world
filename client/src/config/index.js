import dotenv from "dotenv";
dotenv.config();

export default {
  REACT_APP_BASIC_SERVER_URL: process.env.REACT_APP_BASIC_SERVER_URL,
  REACT_APP_BASIC_KAKAO_API_KEY: process.env.REACT_APP_BASIC_KAKAO_API_KEY,
};
