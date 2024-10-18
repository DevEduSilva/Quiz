// Neste JS vou criar variaveis usadas para o DOM utlilizando o $ (Em outras palavras, informa-se que já existe essa var no html direto)
const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")
const $statusGood = document.querySelector(".feedbackGood")
const $statusBad = document.querySelector(".feedbackBad")

// Indicador de questão atual
let currentQuestionIndex = 0
// variavel feita para contabilizar respostas corretas
let totalCorrect = 0

// Função de click para iniciar o quiz
$startGameButton.addEventListener("click", startGame)
// Função de click para avançar para a próxima questão
$nextQuestionButton.addEventListener("click", displayNextQuestion)

// Função de iniciar o quiz e mostar a parte de perguntas
function startGame() {
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")

    displayNextQuestion()
}

function displayNextQuestion() {
    //resetar estado do quiz
    resetState()

    if (questions.length === currentQuestionIndex) {
        // return dizendo para não continuar caso atendido
        return finishGame();
    }

    // Verifica se ainda há questões e insere
    $questionText.textContent = questions[currentQuestionIndex].question

    // Mostrar as respostas disponíveis para a pergunta atual
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("answer", "button")
        newAnswer.textContent = answer.text

        // Gravar o estado da resposta para verificar se foi correta no futuro
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }

        $answersContainer.appendChild(newAnswer)

        //feito para capturar qual resposta foi selecionada
        newAnswer.addEventListener("click", selectAnswer)
    })
}


//resetar estado do quiz
function resetState() {
    // verifica se há um elemento filho na variavels seguinte
    while ($answersContainer.firstChild) {
        // remover elementos filhos
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    //feito para remover efeitos de retorno visual (incorreto ou correto)
    document.body.removeAttribute("class")

    // Deixará o botão de proxima oculta até selecionar outra resposta novamente
    $statusGood.classList.add("hide")
    $statusBad.classList.add("hide")
    $nextQuestionButton.classList.add("hide")
}

// armezenar resposta do user
function selectAnswer(event) {
    const answerClicked = event.target

    // Verificar se a resposta foi correta
    if (answerClicked.dataset.correct) {
        // altera o fundo para verde para confirmar a resposta
        document.body.classList.add("correct")
        $statusGood.classList.remove("hide")
        // incrementar o total de respostas corretas
        totalCorrect++
    } else {
        // altera o fundo para vermelho
        document.body.classList.add("incorrect")
        $statusBad.classList.remove("hide")

    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            // altera o botão para verde para confirmar a resposta
            button.classList.add("correct")
        } else {
            // altera o botao para verde para confirmar a resposta
            button.classList.add("incorrect")
        }
        // desabilita o botão
        button.disabled = true
    });

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

// Função para terminar o quiz e mostrar as estatísticas
function finishGame() {
    const totalQuestion = questions.length
    // Mostrar o resultado do quiz arredondado e sem ser em decimal
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    // Mostrar as estatísticas do quiz
    let message = ""

    switch (true) {
        case (performance >= 100):
            message = "Parabéns, você todas as questões!"
            break
        case (performance >= 70):
            message = `Aprovado! Parabéns, você acertou ${performance}% das questões!!`
            break
        default:
            message = "Não atingiu o requisito! Pode melhorar"
    }

    $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou <strong>${totalCorrect}</strong> de ${totalQuestion} questões!
            <br>
            <span>${message}</span>
        </p>
        <!--AQUI FORÇA A PÁGINA À REINICIAR-->
        <button onclick=window.location.reload() class="button">
            Refazer teste!
        </button>
    `
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