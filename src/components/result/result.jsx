import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

const Result = ({ totalCorrect, totalIncorrect }) => {
  const resetQuiz = () => {
    window.location.reload();
  };
  return (
    <Box height="95vh" align="center" display="flex" justifyContent="center" alignItems="center">
      <Container>
        <Paper elevation={3}>
          <Typography py="10vh" fontWeight={600} fontSize={{ xs: 20, sm: 40 }}>
            Score: {totalCorrect.length}/10
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Typography fontWeight={600} fontSize={{ xs: 20, sm: 30 }} component="p">
                correct answer: {totalCorrect.length}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight={600} fontSize={{ xs: 20, sm: 30 }} component="p">
                incorrect answer: {totalIncorrect.length}
              </Typography>
            </Grid>
          </Grid>
          <Button onClick={() => resetQuiz()} variant="contained" sx={{ my: "10vh", width: "75%" }}>
            Reset
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Result;
