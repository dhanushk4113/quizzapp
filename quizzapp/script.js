const originalQuizData = [
    {
        question: "What is the capital of Java?",
        options: ["Jakarta", "Bandung", "Surabaya", "Semarang"],
        answer: "Jakarta"
    },
    {
        question: "Which of the following is a primitive data type in Java?",
        options: ["String", "Object", "Array", "Boolean"],
        answer: "Boolean"
    },
    {
        question: "Which keyword is used to define a class in Java?",
        options: ["class", "interface", "extends", "new"],
        answer: "class"
    },
    {
        question: "What is the default value of int variable?",
        options: ["0", "null", "NaN", "undefined"],
        answer: "0"
    },
    {
        question: "What is the size of double variable?",
        options: ["8 bytes", "4 bytes", "16 bytes", "Depends on the system architecture"],
        answer: "8 bytes"
    },
    {
        question: "Which of the following is not a Java keyword?",
        options: ["null", "volatile", "unsigned", "transient"],
        answer: "unsigned"
    },
    {
        question: "Which data type is used to create a variable that should store text?",
        options: ["String", "Text", "string", "Txt"],
        answer: "String"
    },
    {
        question: "Which of the following is a loop control statement in Java?",
        options: ["if", "for", "while", "do-while"],
        answer: "for"
    },
    {
        question: "Which method can be used to find the length of a string in Java?",
        options: ["length()", "size()", "getSize()", "length"],
        answer: "length()"
    },
    {
        question: "Which of the following is used to create an object in Java?",
        options: ["new", "alloc", "create", "make"],
        answer: "new"
    }
];

let quizData = [];
let shuffledIndexes = [];
let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submitBtn');
const reassessmentButton = document.getElementById('reassessmentBtn');
const modal = document.getElementById('modal');
const scoreDisplay = document.getElementById('score');
const okButton = document.getElementById('okBtn');
const closeButton = document.getElementsByClassName('close')[0];

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function buildQuiz() {
    if (shuffledIndexes.length === 0) {
        for (let i = 0; i < originalQuizData.length; i++) {
            shuffledIndexes.push(i);
        }
        shuffle(shuffledIndexes);
    }

    const questionIndex = shuffledIndexes[currentQuestion];
    const questionData = originalQuizData[questionIndex];
    const options = questionData.options.map(option =>
        `<label>
            <input type="radio" name="question" value="${option}">
            ${option}
        </label>`
    );

    const output = `
        <div class="question">${currentQuestion + 1}. ${questionData.question}</div>
        <div class="options">${options.join('')}</div>
    `;

    quizContainer.innerHTML = output;
}

function showResults() {
    const answerContainer = quizContainer.querySelector('.options');
    const userAnswer = answerContainer.querySelector('input[name="question"]:checked').value;

    const questionIndex = shuffledIndexes[currentQuestion];
    const correctAnswer = originalQuizData[questionIndex].answer;

    if (userAnswer === correctAnswer) {
        score++;
        answerContainer.style.color = 'green';
    } else {
        answerContainer.style.color = 'red';
    }

    currentQuestion++;
    if (currentQuestion < originalQuizData.length) {
        buildQuiz();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    modal.style.display = 'block';
    scoreDisplay.innerHTML = `You scored ${score} out of ${originalQuizData.length}`;
    reassessmentButton.style.display = 'block';
}

function reassessQuiz() {
    currentQuestion = 0;
    score = 0;
    shuffledIndexes = [];
    buildQuiz();
    resultsContainer.innerHTML = '';
    submitButton.style.display = 'block';
    reassessmentButton.style.display = 'none';
    modal.style.display = 'none';
}

buildQuiz();

submitButton.addEventListener('click', showResults);
reassessmentButton.addEventListener('click', reassessQuiz);

okButton.onclick = function() {
    modal.style.display = 'none';
}

closeButton.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
