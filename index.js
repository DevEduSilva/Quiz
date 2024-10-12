// Neste JS vou criar variaveis usadas para o DOM utlilizando o $ (Em outras palavras, informa-se que já existe essa var no html direto)
const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")

// Indicador de questão atual
let currentQuestionIndex = 0

// Função de click para iniciar o quiz
$startGameButton.addEventListener("click", startGame)

// Função de iniciar o quiz e mostar a parte de perguntas
function startGame() {
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")

    displayNextQuestion()
}

function displayNextQuestion() {
    // verifica se há um elemento filho na variavels seguinte
    while ($answersContainer.firstChild) {
        // remover elementos filhos
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    // Verifica se ainda há questões e insere
    $questionText.textContent = questions[currentQuestionIndex].question

    // Mostrar as respostas disponíveis para a pergunta atual
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("answer", "button")
        newAnswer.textContent = answer.text

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }

        $answersContainer.appendChild(newAnswer)

    })
}











// Perguntas:
const questions = [
    {
        question: "Dentro de qual elemento HTML colocamos o JavaScript?",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<scripting>", correct: false }
        ]
    },
    {
        question: "Onde é o lugar correto para inserir JavaScript?",
        answers: [
            { text: "Tanto no <head> quanto no <body> está correto", correct: true },
            { text: "No <body>", correct: false },
            { text: "No <head>", correct: false },
            { text: "Em outro lugar", correct: false }
        ]
    },
    {
        question: 'Qual é a sintaxe correta para se referir a um script externo chamado "xxx.js"',
        answers: [
            { text: '<script src="xxx.js">', correct: true },
            { text: '<script href="xxx.js">', correct: false },
            { text: '<script name="xxx.js">', correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: 'O arquivo JavaScript externo deve conter a tag <script>',
        answers: [
            { text: "Verdadeiro", correct: false },
            { text: "Falso", correct: true }
        ]
    },
    {
        question: 'Como escrever "Hello World" numa caixa de alerta?',
        answers: [
            { text: 'msg("Hello World");', correct: false },
            { text: 'alert("Hello World");', correct: true },
            { text: 'msgBox("Hello World");', correct: false },
            { text: 'alertBox("Hello World");', correct: false }
        ]
    },
    {
        question: 'Como podemos criar uma função no JavaScript?',
        answers: [
            { text: 'function:myFunction()', correct: false },
            { text: 'function myFunction()', correct: true },
            { text: 'function = myFunction()', correct: false },
            { text: 'Nenhum desses códigos criaria uma função', correct: false }
        ]
    },
    {
        question: 'Como podemos chamar uma função chamada "minhaFuncao"?',
        answers: [
            { text: 'call minhaFuncao()', correct: false },
            { text: 'call function minhaFuncao()', correct: false },
            { text: 'Nenhum desses códigos chamaria essa função', correct: false },
            { text: 'minhaFuncao()', correct: true },
        ]
    },
]