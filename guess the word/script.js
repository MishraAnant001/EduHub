let words = [
    {
        word: "CHESS",
        hint: "mind game"
    },
    {
        word: "KOHLI",
        hint: "cricketer"
    },
    {
        word: "FLUTE",
        hint: "musical Instrument"
    },
    {
        word: "PYTHON",
        hint: "Programming Language"
    },
    {
        word: "PUZZLE",
        hint: "challenging game or problem"
    },
    {
        word: "GUITAR",
        hint: "musical instrument with strings"
    },
    {
        word: "PHOTOGRAPHY",
        hint: "art or practice of taking and processing photographs"
    },
    {
        word: "SCULPTURE",
        hint: "art form involving shaping of materials"
    },
    {
        word: "ASTRONOMY",
        hint: "study of celestial objects and phenomena"
    }
]
let startbtn = document.getElementsByClassName("buttonstart")[0];
let gamediv = document.getElementById("game");
let hint = document.getElementById("hint");
let remguess = document.getElementById("remguess");
let wrongletter = document.getElementById("wrongletter");
let lettercontainer = document.getElementById("lettercontainer");
let wongame = false;
startbtn.onclick = () => {
    // Array.from(guessbtns).forEach((e)=>{
    //     e.remove();
    // })
    startgame();
    startbtn.innerHTML = "Reset Game"
    // console.log("clicked");
}
function isAlphabet(key) {
    let regex = /^[A-Z]$/;
    return regex.test(key);
}
let wordindex = 0;
function startgame() {
    gamediv.classList.remove("d-none");
    let guessword = words[wordindex];
    // console.log(wordindex);
    let wordlength = guessword.word.length;
    hint.innerHTML = `Hint : ${guessword.hint}`
    let numofguess = wordlength + 3;
    remguess.innerHTML = `Remaining Guesses : ${numofguess}`
    wrongletter.innerHTML = "Wrong letters :";
    for (let i = 0; i < wordlength; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "guessbtn");
        lettercontainer.append(div);
        // console.log(key);
    }
    let guessbtns = document.getElementsByClassName("guessbtn");
    // console.log(guessbtns);
    // Array.from(guessbtns).forEach((e)=>{
    //     console.log(e);
    // })
    // console.log(guessbtns[1]);
    let count = 0;
    let boolarray = new Array(wordlength).fill(false);
    window.onkeydown = (e) => {
        // console.log(numofguess);
        if (numofguess == 0) {
            alert("You lose !")
            startbtn.onclick = () => {
                Array.from(guessbtns).forEach((e) => {
                    e.remove();
                })
                // wrongletter.innerHTML="Wrong letters :"
                startgame();
                // startbtn.innerHTML = "Reset Game"
                // console.log("clicked");
            }
            return; 
            // Array.from(guessbtns).forEach((e) => {
            //     e.remove();
            // })
            // wordindex++;
            // if (wordindex == words.length) {
            //     // console.log(object);
            //     wordindex = 0;
            // }
            // numofguess = wordlength + 3;
            // startgame();
        }
        // alert("you pressed a key")
        let userkey = e.key.toUpperCase();
        // console.log(userkey);
        if (userkey == 'ENTER' || userkey == ' ') {
            e.preventDefault(); // Prevent default browser behavior
            return;
        }

        if (isAlphabet(userkey)) {
            if (wongame == true) {
                e.preventDefault(); // Prevent default browser behavior
                return;
            }
            let reqletter = guessword.word.split('')
            // console.log(reqletter);
            let flag = false;
            // let reqindex = 0;
            let answerindex = []
            reqletter.forEach((element, index) => {
                if (element == userkey) {
                    flag = true;
                    answerindex.push(index);
                }

                // console.log(element,index)
            })
            if (flag == true) {
                answerindex.forEach((e, i) => {
                    guessbtns[e].innerHTML = userkey;
                })
                answerindex.forEach((e, i) => {
                    // guessbtns[e].innerHTML = userkey;
                    if (boolarray[e] == false) {
                        boolarray[e] = true;
                        count++;
                    }
                })

                answerindex = [];
                // console.log(count);
                if (count == wordlength) {
                    setTimeout(() => {
                        alert("You won!")
                    }, 100);
                    wongame = true;
                    wordindex++;
                    if (wordindex == words.length) {
                        // setTimeout(() => {
                        //     alert("You won!")
                        // }, 100); 
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                    // console.log(wordindex);
                    startbtn.onclick = () => {
                        Array.from(guessbtns).forEach((e) => {
                            e.remove();
                        })
                        wongame=false;
                        // wrongletter.innerHTML="Wrong letters :"
                        startgame();
                        // startbtn.innerHTML = "Reset Game"
                        // console.log("clicked");
                    }
                    // wrongletter.innerHTML="Wrong letters :"
                    // startgame();
                }
            } else {
                wrongletter.innerHTML += userkey;
                numofguess--;
                // console.log(count);
                // console.log(numofguess);

                if (numofguess == 0) {
                    alert("You lose !")
                    reqletter.forEach((element, index) => {
                        guessbtns[index].innerHTML = element;

                    })
                    wordindex++;
                    if (wordindex == words.length) {
                        // console.log(object);
                        wordindex = 0;
                    }
                    // console.log(wordindex);

                    // Array.from(guessbtns).forEach((e) => {
                    //     e.remove();
                    // })
                    // console.log(guessword[wordindex]);

                    startbtn.onclick = () => {
                        Array.from(guessbtns).forEach((e) => {
                            e.remove();
                        })
                        // wrongletter.innerHTML="Wrong letters :"
                        startgame();
                        // startbtn.innerHTML = "Reset Game"
                        // console.log("clicked");
                    }

                    // startgame();

                }
                remguess.innerHTML = `Remaining Guesses : ${numofguess}`
            }
        }

        // if(userkey=='ENTER' && numofguess>0){
        //     Array.from(guessbtns).forEach((e)=>{
        //         e.remove();
        //     })
        //     wordindex++;
        //     if(wordindex==words.length){
        //         // console.log(object);
        //         wordindex=0;
        //     }
        //     numofguess = wordlength + 3;
        //     startgame();
        // }
        // console.log(userkey);

    }


    // console.log(wordlength);
    // console.log(guessword);


}


