import axios from "axios";

const dataQuiz = async () => {
  const res = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
  return res.data;
};

export default dataQuiz;
