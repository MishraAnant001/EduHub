// 
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Madrid", correct: false },
            { text: "Berlin", correct: false },
            { text: "London", correct: false },
            { text: "Paris", correct: true }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Jane Austen", correct: false },
            { text: "Leo Tolstoy", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "NaCl", correct: false },
            { text: "O2", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "What is the currency of Japan?",
        answers: [
            { text: "Euro", correct: false },
            { text: "Dollar", correct: false },
            { text: "Yen", correct: true },
            { text: "Pound", correct: false }
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Stephen Hawking", correct: false },
            { text: "Niels Bohr", correct: false }
        ]
    },
    {
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Heart", correct: false },
            { text: "Liver", correct: false },
            { text: "Brain", correct: false },
            { text: "Skin", correct: true }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mercury", correct: false }
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            { text: "Mount Everest", correct: true },
            { text: "K2", correct: false },
            { text: "Kangchenjunga", correct: false },
            { text: "Makalu", correct: false }
        ]
    },
    {
        question: "Who was the first person to step on the Moon?",
        answers: [
            { text: "Neil Armstrong", correct: true },
            { text: "Buzz Aldrin", correct: false },
            { text: "Yuri Gagarin", correct: false },
            { text: "Alan Shepard", correct: false }
        ]
    }
];

const btn = document.querySelectorAll(".btn");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextbtn = document.getElementById("next-btn");
const quiz = document.getElementsByClassName("quiz")[0];
// console.log(nextbtn);
const startbtn = document.getElementsByClassName("start-quiz")[0];
startbtn.addEventListener('click', () => {
    startbtn.style.display = "none";
    // console.log("start");
    startQuiz()
})

let currentQuestionindex = 0;
let score = 0;

function startQuiz() {
    currentQuestionindex = 0;
    score = 0;
    quiz.classList.remove("d-none");
    showQuestion();
}
quiz.addEventListener("click", (e) => {
    let target = e.target
    // console.log(target);
    if (target.className === "btn m-4") {
        // console.log("calling findresult");
        findResult(currentQuestionindex, target.innerHTML, target)
    }
    // console.log((target.innerHTML));
    // console.log("🚀 ~ quiz.addEventListener ~ findResult:", findResult(currentQuestionindex,target.innerHTML))
    // console.log(res);
})
function showQuestion() {
    let currentQuestion = questions[currentQuestionindex];
    // console.log("🚀 ~ showQuestion ~ currentQuestion:", currentQuestion)
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach((answer, index) => {
        btn[index].innerHTML = answer.text;
    })
    quiz.removeEventListener("click",null);
    
    // console.log("🚀 ~ quiz.addEventListener ~ findResult:", findResult)
}
//  let answer = Array.from(questions)[0].answers.find(text="shark")
//  console.log(answer);
// questions.[0]
//  console.log("🚀 ~ questions:", questions[0].answers)
// let flag = true;
function findResult(currentQuestionindex, userans, target) {
    // console.log("inside findres", currentQuestionindex, userans);
    // console.log(target);
    let correct = false;
    let correctans=null;
    questions[currentQuestionindex].answers.forEach((ans) => {
        // if(){
        if (ans.text == userans) {
            correct = ans.correct;
        }
        if(ans.correct==true){
            correctans=ans.text;
        }
        // target.style.background="green !important";
        // target.classList.add("bg-success");
        // return;
        // }
        // return 1;
    })
    // if (flag == true) {
        if (correct == true) {
            target.style.cssText = "background-color: #0080006e !important; color:black !important;";
            // 
            score++;

        }
        else {
            target.style.cssText = "background-color: #ff000063 !important;color:black !important;";
            
        }
        // console.log(correctans);
        //  quiz.removeEventListener('click', null);
        btn.forEach((button) => {
            if(button!==target ){
                if(button.innerHTML===correctans)
                {
                    button.style.cssText = "background-color: #0080006e !important; color:black !important;";
                }
                else{
                    button.disabled=true;
                }
                // console.log( button.innerHTML);
                // button.disabled=true;
            }
        });
        // flag = false;
        // console.log(score);
    // }
    // console.log(correct);

    //  btn.forEach((button)=> {
    // });
    
}
quiz.removeEventListener("click",null);

function reset(){
    // console.log("calling reset");
    btn.forEach((button) => {
    button.disabled = false;
    button.removeAttribute("style");
    });
}

nextbtn.addEventListener('click',()=>{
    if(nextbtn.innerHTML==="Play Again"){
        window.location.reload();
    }
    else if(currentQuestionindex==questions.length-1){
        questionElement.innerHTML=`Your Score was  ${score}/${questions.length} <br>
        Thank You for Playing`;
        nextbtn.innerHTML="Play Again"
        btn.forEach((button) => {
            button.style.display="none";
            });

    }
    else{
        reset();
        currentQuestionindex++;
        if(currentQuestionindex==questions.length-1){
        nextbtn.innerHTML="Submit";
        }
        showQuestion();
        // flag=true;
    }

})





