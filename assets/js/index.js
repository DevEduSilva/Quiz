import { questions } from './question.js';

const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next-question");
const $statusGood = document.querySelector(".feedbackGood");
const $statusBad = document.querySelector(".feedbackBad");
const $imgElement = document.querySelector(".question-image");
const $progressBarContainer = document.querySelector(".progress-bar-container")
const $progressBar = document.querySelector(".progress-bar")

let currentQuestionIndex = 0;
let totalCorrect = 0;

// Função para iniciar o quiz
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

function startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    $progressBarContainer.classList.remove("hide");

    displayNextQuestion();
}

function displayNextQuestion() {
    resetState();

    if (questions.length === currentQuestionIndex) {
        $progressBarContainer.classList.add("hide");
        return finishGame();
    }

    // Atualizar texto da pergunta
    $questionText.textContent = `${currentQuestionIndex + 1}) ${questions[currentQuestionIndex].question}`;

    // Atualizar o `src` da imagem para a nova pergunta
    if (questions[currentQuestionIndex].image) {
        $imgElement.src = questions[currentQuestionIndex].image;
        $imgElement.classList.remove("hide");
    } else {
        $imgElement.classList.add("hide"); // Ocultar imagem se não houver
    }

    // Atualizar a barra de progresso
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    $progressBar.style.width = `${progressPercentage}%`;

    // Mostrar respostas da pergunta atual
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("answer", "button");
        newAnswer.textContent = answer.text;

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
        }

        $answersContainer.appendChild(newAnswer);
        newAnswer.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    }

    document.body.removeAttribute("class");
    $statusGood.classList.add("hide");
    $statusBad.classList.add("hide");
    $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
    const answerClicked = event.target;

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        $statusGood.classList.remove("hide");
        totalCorrect++;
    } else {
        document.body.classList.add("incorrect");
        $statusBad.classList.remove("hide");
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    $nextQuestionButton.classList.remove("hide");
    currentQuestionIndex++;
}

function finishGame() {
    const totalQuestion = questions.length;
    const performance = Math.floor((totalCorrect * 100) / totalQuestion);

    let message = "";

    if (performance >= 100) {
        message = "Parabéns, você acertou todas as questões!";
    } else if (performance >= 70) {
        message = `Aprovado! Parabéns, você acertou ${performance}% das questões!!`;
    } else {
        message = "Não atingiu o requisito! Pode melhorar";
    }

    $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou <strong>${totalCorrect}</strong> de ${totalQuestion} questões!
            <br>
            <span>${message}</span>
        </p>
        <button onclick="window.location.reload()" class="button">Refazer teste!</button>
    `;
}
