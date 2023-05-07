import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dataQuiz from "../../api/api";
import Result from "../../components/result/result";

const Quiz = () => {
  // const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [numberQuestion, setNumberQuestion] = useState(0);
  // const [answered, setAnswered] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [incorrectAnswer, setIncorrectAnswer] = useState([]);

  // ==========================================
  // ============== ALL ANSWER =================
  const combinedAnswer = [];
  let incorrectAnswers = questions.incorrect_answers;
  if (incorrectAnswers === undefined) {
    incorrectAnswers = [];
  } else {
    incorrectAnswers.map((index) => {
      combinedAnswer.push(index);
    });
    combinedAnswer.push(questions.correct_answer);
    combinedAnswer.sort(() => Math.random() - 0.5);
  }
  // ===========================================

  useEffect(() => {
    dataQuiz(number)
      .then((res) => {
        let maxNumber = number;
        if (number > 9) {
          maxNumber = 9;
        }
        setQuestions(res.results[maxNumber]);
        setNumberQuestion(maxNumber + 1);
      })
      .catch((err) => console.error(err));
  }, [number]);

  // ==========================================
  // ============== CHECK ANSWER ==============
  const checkAnswer = (e) => {
    let answer = e.target.value;

    if (answer === questions.correct_answer && !correctAnswer.includes(answer) && number <= 9) {
      setCorrectAnswer([...correctAnswer, answer]);
      console.log(true);
    }
    if (answer != questions.correct_answer) {
      setIncorrectAnswer([...incorrectAnswer, answer]);
      console.log(false);
    }
    if (number <= 9) {
      setNumber(number + 1);
    }
    if (number > 9) {
      console.log(`score=${correctAnswer.length}`);
    }
  };

  // ==========================================
  // === CONVERT HTML CODE TO REGULAR TEXT ====
  function removeCharacters(question) {
    if (question === undefined) {
      question = "";
    } else {
      question;
      let doc = new DOMParser().parseFromString(question, "text/html");
      return doc.documentElement.textContent;
    }
  }

  return (
    <Box align="center" mt="5vh">
      {number > 9 ? (
        <Result totalCorrect={correctAnswer} totalIncorrect={incorrectAnswer} />
      ) : (
        <Container>
          <Paper elevation={3}>
            <Typography component="p" fontWeight={600} fontSize={{ xs: 20, sm: 35 }} py="5vh">
              Quiz Game
            </Typography>
            <Paper elevation={3} sx={{ my: "3vh", width: { xs: "75%", sm: "25%" } }}>
              <Typography p="3vh" component="p" fontWeight={600} fontSize={{ xs: 15, sm: 20 }}>
                Question: {numberQuestion}/10
              </Typography>
            </Paper>
            <Typography p="3vh" mb="3vh" component="p" fontWeight={600} fontSize={{ xs: 20, sm: 35 }}>
              {removeCharacters(questions.question)}
            </Typography>
            <Grid container spacing={2} sx={{ width: { xs: "100%", sm: "45em" }, pb: { xs: "2vh", sm: "5vh" } }}>
              {combinedAnswer?.map((index, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Button
                    variant="contained"
                    value={index}
                    sx={{ width: "75%", height: "40px" }}
                    onClick={(e) => {
                      checkAnswer(e);
                    }}
                  >
                    {index}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      )}
    </Box>
  );
};

export default Quiz;
