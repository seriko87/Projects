const btn = document.querySelector('#btn');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const displayQuestion = document.querySelector('#output');
const selectAnswer = document.querySelector('#selAnswers');
const selectCategory =  document.querySelector('#category');
const selectDifficulty = document.querySelector('#difficulty');
const scoreDisplay = document.querySelector('#score');
const timer = document.querySelector('.timer');

const scores = {'correct': 0, 'wrong': 0};

const categories = {
     9: 'General Knowlegde',
    11: 'Enternainment: Film',
    31: 'Entertainment: Japanese Anime &amp; Manga',
    15: 'Enternainment: Video Games',
    18: 'Science: Computers',
    21: 'Sports'
};

const difficulty = {
    'easy': 'Easy',
    'medium': 'Medium',
    'hard': 'Hard'
};

// updating the category and difficulty
document.addEventListener('DOMContentLoaded', function(){
    for (let index in categories) {
        let option = document.createElement('option');
        option.value = index;
        option.innerHTML = categories[index];
        selectCategory.appendChild(option);
    };

    for (let index in difficulty) {
        let option = document.createElement('option');
        option.value = index;
        option.innerHTML = difficulty[index];
        selectDifficulty.appendChild(option);
    };
})

//listing questions
btn.addEventListener('click', function(){
    const category = selectCategory.value;
    const difficulty = selectDifficulty.value;
    getQuestions(category,difficulty);
    btn.style.display = 'none';
    btn1.style.display = 'block';
    timer.style.display = 'block';
    setInterval(timerF, 500);
    
})

btn1.addEventListener('click', function(){
    const category = selectCategory.value;
    const difficulty = selectDifficulty.value;
    getQuestions(category,difficulty);
    selectAnswer.style.pointerEvents = 'auto';
    timer.style.backgroundColor = '#17970cad';
    a = 780;
    timer.style.display = 'block';
    
})


var a = 780;
function timerF() {
    const correct1 = document.querySelector('[data-cor="true"]');    
    timer.style.width = `${a}px`;
    a -=20;
    if (a<=300){
        timer.style.backgroundColor = '#ff0000a1';
    }
    if (a===0){
        correct1.style.backgroundColor ='#138116c0';
        selectAnswer.style.pointerEvents = 'none';
    }
}


function scoreUpdate(){
    scoreDisplay.innerHTML = `Correct: ${scores['correct']} - Wrong: ${scores['wrong']} `;
}

//getting questions from api category and difficulty will be passed as parameters
function getQuestions (category, difficulty){
   $.ajax({
        url: `https://opentdb.com/api.php?/search`,
        data:{amount:1, category: category, difficulty: difficulty},
        type: 'GET',
        datatype: 'json',
        success: function(data){
            output(data.results[0]);
        }
    });
};

//displaying output
function output(item){
    selectAnswer.innerHTML = '';
    const category = item.category;
    const difficulty = item.difficulty;
    const question = item.question;
    const answers = [];
    answers.push([item.correct_answer, true]);
    const output = 
                    `<div>
                        <div class='category'><label>Category: </label>${category}  <label>Difficulty: </label>${difficulty} </div>
                        <div class='question'>${question}</div>
                    </div>`;

    displayQuestion.innerHTML = output;

    for (let answer of  item.incorrect_answers) {
        answers.push([answer,false]);
    };
    answers.sort();
    for (let answer of answers){
        let button = document.createElement('button');
        button.className = 'button';
        button.innerHTML = answer[0];
        button.dataset.cor = answer[1];
        selectAnswer.appendChild(button);
    };
    answerCheker(item.correct_answer);
}

//cheking answers
function answerCheker(correctAns){
    const buttons = document.querySelectorAll('.button');
    const correct = document.querySelector('[data-cor="true"]');
    buttons.forEach(button =>{
        button.addEventListener('click', function(){
            if (button.dataset.cor == 'true'){
                button.style.backgroundColor = '#138116c0';
                selectAnswer.style.pointerEvents = 'none';
                scores['correct'] +=1;
                timer.style.display = 'none';
                scoreUpdate();
            } else {
                button.style.backgroundColor = '#ff3636';
                correct.style.backgroundColor ='#138116c0';
                selectAnswer.style.pointerEvents = 'none';
                scores['wrong'] +=1;
                timer.style.display = 'none';
                scoreUpdate();
            };
        });
    });
    
};

// reloading page
btn2.addEventListener('click', function(){
    location.reload();
    return false;
});






    
    
    


