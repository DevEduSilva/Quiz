import { questions } from './question.js'

function ver() {
    console.log(questions)
}
ver()
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