// para mostrar em outro arquivo, deve exportar usando o export 
export const questions = [
    {
        question: "Dentro de qual elemento HTML colocamos o JavaScript?",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<scripting>", correct: false }
        ],
        image: "assets/img/teste1.png"
    },
    {
        question: "Onde é o lugar correto para inserir JavaScript?",
        answers: [
            { text: "Tanto no <head> quanto no <body> está correto", correct: true },
            { text: "No <body>", correct: false },
            { text: "No <head>", correct: false },
            { text: "Em outro lugar", correct: false }
        ],
        image: "assets/img/teste2.png"
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
        ],
        image: "assets/img/teste3.png"        
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