const questionText = document.querySelector('.question');
const answers = document.querySelector('.answers');
const nextBtn = document.querySelector('button');


const quizUrl = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";

let currentQuestionIndex = 0;
let score = 0;

const loadQuiz = async() => {
    const response = await fetch(quizUrl);
    const data = await response.json();
    showQuiz(data.results[0]);
    
};

const showQuiz = (data) => {
    let question = data.question;
    let correctAnswer = data.correct_answer;
    let incorrectAnswers = data.incorrect_answers;
    let optionsList = data.incorrect_answers;
    optionsList.splice(Math.floor(Math.random() * incorrectAnswers.length + 1), 0, correctAnswer);
    questionText.innerHTML = question;
    answers.innerHTML = 
        `${optionsList.map((option) =>
            `<button class='btn'> ${option} </button>`).join('')}
        `;
    let ans = document.querySelectorAll(".btn");
    checkAnswer(ans, correctAnswer);

    console.log(correctAnswer);
    loadNextQuestion();
}

function checkAnswer(ans, correctAnswer) {
    ans.forEach(a => {
        a.addEventListener('click', () => {
            if(a.innerText === correctAnswer){
                score = score + 1;
                document.querySelector('.score').innerText = `Score: ${score}`;
            }
            disabledBtn(ans, correctAnswer)
            
        })
    });
}

function disabledBtn(ans, correctAnswer){
    ans.forEach(element => {
        if(element.innerText === correctAnswer){
            element.classList.add('correct-answer');
        }else{
            element.classList.add('incorrect-answer')
        }
        nextBtn.style.display = 'block';
        element.disabled =true;        
    })
}
const loadNextQuestion = () => {
    nextBtn.addEventListener('click', () => {
        loadQuiz();
        nextBtn.style.display = 'none';
    })
}

loadQuiz();

