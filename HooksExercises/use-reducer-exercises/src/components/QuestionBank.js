import React, { useReducer, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaTrophy } from "react-icons/fa";

// Khởi tạo trạng thái ban đầu
const initialState = {
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
  feedback: "", // phản hồi đúng/sai
  highScore: 0,
};

// Reducer xử lý các hành động
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION":
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === currentQ.answer;
      const feedback = isCorrect
        ? "✅ Correct!"
        : `❌ Incorrect! The correct answer is: ${currentQ.answer}`;

      const newScore = isCorrect ? state.score + 1 : state.score;
      const nextQuestion = state.currentQuestion + 1;
      const showScore = nextQuestion === state.questions.length;

      const updatedHighScore = Math.max(newScore, state.highScore);

      if (showScore) {
        localStorage.setItem("quizHighScore", updatedHighScore);
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: nextQuestion,
        selectedOption: "",
        showScore,
        feedback,
        highScore: updatedHighScore,
      };

    case "RESTART_QUIZ":
      const savedHighScore = localStorage.getItem("quizHighScore") || 0;
      return {
        ...initialState,
        highScore: parseInt(savedHighScore),
      };

    default:
      return state;
  }
}

// Component chính
function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    feedback,
    highScore,
  } = state;

  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore");
    if (savedHighScore) {
      dispatch({ type: "RESTART_QUIZ" });
    }
  }, []);

  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h3 className="text-center mb-4">🧠 Quiz Game</h3>

        {showScore ? (
          <div className="text-center">
            <h2>
              <FaTrophy style={{ color: "gold", marginRight: "10px" }} />
              Your Score: {score} / {questions.length}
            </h2>
            <p>🏆 High Score: {highScore}</p>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <h4>
              Question {questions[currentQuestion].id}:<br />
              {questions[currentQuestion].question}
            </h4>

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "success" : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>

            {/* Hiển thị phản hồi */}
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

export default QuestionBank;