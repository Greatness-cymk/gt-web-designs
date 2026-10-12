
document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------
    // 1. TIC-TAC-TOE
    // ----------------------------------

    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.getElementById("gameStatus");
    const resetGame = document.getElementById("resetGame");

    let board = Array(9).fill("");
    let currentPlayer = "X";
    let gameOver = false;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        return winningCombinations.find(combination =>
            combination.every(index => board[index] === currentPlayer)
        );
    }

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = Number(cell.dataset.cell);

            if (board[index] !== "" || gameOver) {
                return;
            }

            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.disabled = true;

            const winningCombination = checkWinner();

            if (winningCombination) {
                gameStatus.textContent = `Player ${currentPlayer} wins! 🎉`;
                winningCombination.forEach(i => cells[i].classList.add("winning"));
                gameOver = true;
                cells.forEach(button => button.disabled = true);
                return;
            }

            if (board.every(value => value !== "")) {
                gameStatus.textContent = "It's a draw! 🤝";
                gameOver = true;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        });
    });

    function startTicTacToe() {
        board = Array(9).fill("");
        currentPlayer = "X";
        gameOver = false;

        cells.forEach(cell => {
            cell.textContent = "";
            cell.disabled = false;
            cell.classList.remove("winning");
        });

        gameStatus.textContent = "Player X's turn";
    }

    resetGame.addEventListener("click", startTicTacToe);


    // ----------------------------------
    // 2. NUMBER GUESSING GAME
    // ----------------------------------

    const numberForm = document.getElementById("numberForm");
    const numberGuess = document.getElementById("numberGuess");
    const numberFeedback = document.getElementById("numberFeedback");
    const newNumberGame = document.getElementById("newNumberGame");

    let secretNumber;
    let guesses = 0;
    let numberGameOver = false;

    function startNumberGame() {
        secretNumber = Math.floor(Math.random() * 20) + 1;
        guesses = 0;
        numberGameOver = false;

        numberGuess.value = "";
        numberGuess.disabled = false;
        numberForm.querySelector("button").disabled = false;
        numberFeedback.textContent = "Make your first guess!";
        numberGuess.focus();
    }

    numberForm.addEventListener("submit", event => {
        event.preventDefault();

        if (numberGameOver) {
            return;
        }

        const guess = Number(numberGuess.value);

        if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
            numberFeedback.textContent = "Enter a whole number from 1 to 20.";
            return;
        }

        guesses++;

        if (guess === secretNumber) {
            numberFeedback.textContent =
                `Correct! 🎉 You found it in ${guesses} ${guesses === 1 ? "guess" : "guesses"}!`;

            numberGameOver = true;
            numberGuess.disabled = true;
            numberForm.querySelector("button").disabled = true;
        } else if (guess < secretNumber) {
            numberFeedback.textContent = "Too low! Try a higher number. ⬆️";
        } else {
            numberFeedback.textContent = "Too high! Try a lower number. ⬇️";
        }

        if (!numberGameOver) {
            numberGuess.select();
        }
    });

    newNumberGame.addEventListener("click", startNumberGame);


    // ----------------------------------
    // 3. QUICK BRAIN QUIZ
    // ----------------------------------

    const quizQuestions = [
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Venus", "Jupiter"],
            answer: 1
        },
        {
            question: "How many sides does a hexagon have?",
            options: ["Five", "Six", "Seven", "Eight"],
            answer: 1
        },
        {
            question: "Which animal is known as the King of the Jungle?",
            options: ["Tiger", "Elephant", "Lion", "Giraffe"],
            answer: 2
        },
        {
            question: "What is 9 × 7?",
            options: ["56", "63", "72", "69"],
            answer: 1
        },
        {
            question: "Which part of a plant usually absorbs water from the soil?",
            options: ["Flower", "Leaves", "Stem", "Roots"],
            answer: 3
        }
    ];

    const quizProgress = document.getElementById("quizProgress");
    const quizScore = document.getElementById("quizScore");
    const quizProgressBar = document.getElementById("quizProgressBar");
    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.getElementById("quizOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const nextQuestion = document.getElementById("nextQuestion");

    let questionIndex = 0;
    let score = 0;
    let questionAnswered = false;

    function showQuestion() {
        questionAnswered = false;

        const question = quizQuestions[questionIndex];

        quizProgress.textContent =
            `Question ${questionIndex + 1} of ${quizQuestions.length}`;

        quizScore.textContent = score;
        quizProgressBar.style.width =
            `${((questionIndex + 1) / quizQuestions.length) * 100}%`;

        quizQuestion.textContent = question.question;
        quizOptions.replaceChildren();
        quizFeedback.textContent = "";

        nextQuestion.disabled = true;
        nextQuestion.textContent =
            questionIndex === quizQuestions.length - 1
                ? "See My Results →"
                : "Next Question →";

        question.options.forEach((option, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "quiz-option";
            button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;

            button.addEventListener("click", () => {
                if (questionAnswered) {
                    return;
                }

                questionAnswered = true;

                const optionButtons = quizOptions.querySelectorAll("button");

                optionButtons.forEach((optionButton, i) => {
                    optionButton.disabled = true;

                    if (i === question.answer) {
                        optionButton.classList.add("correct");
                    }
                });

                if (index === question.answer) {
                    score++;
                    quizFeedback.textContent = "Correct! Great job! 🎉";
                } else {
                    button.classList.add("incorrect");
                    quizFeedback.textContent =
                        `Not quite! The correct answer is ${question.options[question.answer]}.`;
                }

                quizScore.textContent = score;
                nextQuestion.disabled = false;
            });

            quizOptions.appendChild(button);
        });
    }

    function showQuizResults() {
        quizProgress.textContent = "Quiz completed!";
        quizProgressBar.style.width = "100%";
        quizQuestion.textContent =
            `You scored ${score} out of ${quizQuestions.length}!`;

        quizOptions.replaceChildren();

        let message;

        if (score === 5) {
            message = "Perfect score! You're a quiz superstar! 🏆";
        } else if (score >= 3) {
            message = "Well done! Keep that brain power going! 🌟";
        } else {
            message = "Good effort! Try again and beat your score! 💪";
        }

        quizFeedback.textContent = message;
        nextQuestion.textContent = "Play Again ↻";
        nextQuestion.disabled = false;
    }

    nextQuestion.addEventListener("click", () => {
        if (questionIndex === quizQuestions.length - 1 &&
            questionAnswered) {
            questionIndex = 0;
            score = 0;
            showQuestion();
            return;
        }

        if (!questionAnswered) {
            return;
        }

        if (questionIndex < quizQuestions.length - 1) {
            questionIndex++;
            showQuestion();
        } else {
            showQuizResults();
        }
    });

    // Begin the quiz.
    showQuestion();


    // ----------------------------------
    // 4. RIDDLES
    // ----------------------------------

    const riddles = [
        {
            question: "What has keys but cannot open locks?",
            answer: "A piano! 🎹"
        },
        {
            question: "What has hands but cannot clap?",
            answer: "A clock! 🕒"
        },
        {
            question: "What gets wetter the more it dries?",
            answer: "A towel! 🧺"
        },
        {
            question: "What has a neck but no head?",
            answer: "A bottle! 🍾"
        },
        {
            question: "What has one eye but cannot see?",
            answer: "A needle! 🪡"
        },
        {
            question: "What can travel around the world while staying in one corner?",
            answer: "A postage stamp! ✉️"
        }
    ];

    const riddleNumber = document.getElementById("riddleNumber");
    const riddleQuestion = document.getElementById("riddleQuestion");
    const riddleAnswer = document.getElementById("riddleAnswer");
    const revealRiddle = document.getElementById("revealRiddle");
    const nextRiddle = document.getElementById("nextRiddle");

    let riddleIndex = 0;

    function showRiddle() {
        const riddle = riddles[riddleIndex];

        riddleNumber.textContent = `RIDDLE ${riddleIndex + 1}`;
        riddleQuestion.textContent = riddle.question;
        riddleAnswer.textContent = riddle.answer;
        riddleAnswer.hidden = true;
        revealRiddle.hidden = false;
    }

    revealRiddle.addEventListener("click", () => {
        riddleAnswer.hidden = false;
        revealRiddle.hidden = true;
    });

    nextRiddle.addEventListener("click", () => {
        riddleIndex = (riddleIndex + 1) % riddles.length;
        showRiddle();
    });

    // ----------------------------------
    // 5. FOOTER YEAR
    // ----------------------------------

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

    // Start a fresh number game.
    startNumberGame();
});
