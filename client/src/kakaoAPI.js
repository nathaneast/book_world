import axios from "axios";
import config from "./config";

// 카카오 키 env에 넣기 왜 안되는지 모르겠다..
const kakao = axios.create({
  baseURL: "https://dapi.kakao.com/v3/search/book?target=title&query=",
  headers: { Authorization: "KakaoAK " + "960c9d15fc13f8aef6af922c259310a1" },
});

export default (bookTitle) =>
  kakao.get(`${bookTitle}`).catch((error) => {
    console.error(error);
  });
