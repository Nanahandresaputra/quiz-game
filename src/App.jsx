import Quiz from "./page/quizPage/quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
      </Router>
      {/* <Quiz /> */}
    </>
  );
}

export default App;
