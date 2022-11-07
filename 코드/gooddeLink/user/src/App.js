import { BrowserRouter, Routes, Route } from "react-router-dom";//router 쓰기위함
import Check from "./routes/Check";
import Home from "./routes/Home";

function App() {
  //Routes는 하나의 Route 만 실행되도록 함
  // '/search'가 '/'보다 앞에 있어야 함. /search는 /속에도 속하기 때문
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loc_cam/:id/:flag" element={<Home />}></Route> {/*:는 뒤에 변수가 옴, useParams를 이용해 id(변수) 값 설정(Search에서) */}
        <Route path="/:id" element={<Check />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;