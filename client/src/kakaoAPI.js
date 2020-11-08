import axios from "axios";
import config from "./config/index";
const { REACT_APP_BASIC_KAKAO_API_KEY } = config;


const kakao = axios.create({
  baseURL: "https://dapi.kakao.com/v3/search/book?target=title&query=",
  headers: { Authorization: REACT_APP_BASIC_KAKAO_API_KEY },
});

export default (bookTitle) =>
  kakao.get(`${bookTitle}`).catch((error) => {
    console.error(error);
  });
