import React, { Component } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaTrophy } from "react-icons/fa";

class QuestionBank extends Component {
  state = {
    questions: [
      {
        id: 1,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Canberra", "Melbourne", "Perth"],
        answer: "Canberra",
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
      },
      {
        id: 3,
        question: "What is the largest ocean on Earth?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Pacific Ocean",
          "Arctic Ocean",
        ],
        answer: "Pacific Ocean",
      },
    ],
    currentQuestion: 0,
    selectedOption: "",
    score: 0,
    showScore: false,
    feedback: "",
    highScore: 0,
    timer: 10,
    timeExpired: false,
    started: false,
  };

  timerRef = null;

  componentDidMount() {
    const savedHighScore = localStorage.getItem("quizHighScore");
    if (savedHighScore) {
      this.setState({ highScore: parseInt(savedHighScore) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { started, showScore, feedback, currentQuestion } = this.state;

    if (
      started &&
      !showScore &&
      feedback === "" &&
      prevState.currentQuestion !== currentQuestion
    ) {
      this.startTimer();
    }
  }

  startTimer = () => {
    clearInterval(this.timerRef);
    this.setState({ timer: 10, timeExpired: false });

    this.timerRef = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer <= 1) {
          clearInterval(this.timerRef);

          if (!prevState.selectedOption) {
            const currentQ = prevState.questions[prevState.currentQuestion];
            const feedback = `⏰ Time's up! The correct answer is: ${currentQ.answer}`;

            this.setState({ feedback }, () => {
              setTimeout(() => {
                this.handleNextQuestion();
              }, 2000);
            });

            return { timer: 0 };
          }

          return { timeExpired: true };
        }

        return { timer: prevState.timer - 1 };
      });
    }, 1000);
  };

  handleStartQuiz = () => {
    this.setState({ started: true, feedback: "", timer: 10 }, this.startTimer);
  };

  handleOptionSelect = (option) => {
    clearInterval(this.timerRef);
    const currentQ = this.state.questions[this.state.currentQuestion];
    const isCorrect = option === currentQ.answer;
    const feedback = isCorrect
      ? "✅ Correct!"
      : `❌ Incorrect! The correct answer is: ${currentQ.answer}`;
    this.setState({ selectedOption: option, feedback });
  };

  handleNextQuestion = () => {
    clearInterval(this.timerRef);
    const {
      selectedOption,
      questions,
      currentQuestion,
      score,
      highScore,
    } = this.state;

    const currentQ = questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.answer;
    const newScore = isCorrect ? score + 1 : score;
    const nextQuestion = currentQuestion + 1;
    const showScore = nextQuestion === questions.length;
    const updatedHighScore = Math.max(newScore, highScore);

    if (showScore) {
      localStorage.setItem("quizHighScore", updatedHighScore);
    }

    this.setState(
      {
        score: newScore,
        currentQuestion: nextQuestion,
        selectedOption: "",
        showScore,
        feedback: "",
        highScore: updatedHighScore,
        timer: 10,
        timeExpired: false,
      },
      () => {
        if (!showScore) this.startTimer();
      }
    );
  };

  handleRestartQuiz = () => {
    clearInterval(this.timerRef);
    const savedHighScore = localStorage.getItem("quizHighScore") || 0;
    this.setState({
      currentQuestion: 0,
      selectedOption: "",
      score: 0,
      showScore: false,
      feedback: "",
      timer: 10,
      timeExpired: false,
      started: false,
      highScore: parseInt(savedHighScore),
    });
  };

  render() {
    const {
      questions,
      currentQuestion,
      selectedOption,
      score,
      showScore,
      feedback,
      highScore,
      timer,
      timeExpired,
      started,
    } = this.state;

    return (
      <Container className="mt-4">
        <Card className="p-4">
          <h3 className="text-center mb-4">🧠 Quiz Game</h3>

          {!started ? (
            <div className="text-center">
              <Button variant="success" onClick={this.handleStartQuiz}>
                Start Quiz
              </Button>
            </div>
          ) : showScore ? (
            <div className="text-center">
              <h2>
                <FaTrophy style={{ color: "gold", marginRight: "10px" }} />
                Your Score: {score} / {questions.length}
              </h2>
              <p>🏆 High Score: {highScore}</p>
              <Button variant="primary" onClick={this.handleRestartQuiz}>
                Restart Quiz
              </Button>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                Progress: {currentQuestion + 1} / {questions.length}
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: timer < 5 ? "red" : "black",
                }}
              >
                Time left: {timer}s
              </p>

              <h4>
                Question {questions[currentQuestion].id}:<br />
                {questions[currentQuestion].question}
              </h4>

              <div className="mt-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedOption === option
                        ? "success"
                        : "outline-secondary"
                    }
                    className="m-2"
                    onClick={() => this.handleOptionSelect(option)}
                    disabled={!!feedback}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              <Button
                variant="primary"
                className="mt-3"
                disabled={feedback === ""}
                onClick={this.handleNextQuestion}
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </Button>

              {feedback && (
                <div className="mt-4 text-center">
                  {feedback.startsWith("✅") ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      <FaCheckCircle style={{ marginRight: "8px" }} />
                      {feedback}
                    </p>
                  ) : (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      <FaTimesCircle style={{ marginRight: "8px" }} />
                      {feedback}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </Container>
    );
  }
}

export default QuestionBank;  