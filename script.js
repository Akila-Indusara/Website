
//nav bar
function myFunction() {
  let nav = document.getElementById("myTopnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
}

//theme switch
// Retrieve the switcher element
let switcher = document.getElementById("switcher");

// Check if the switcher state is stored in localStorage
let switcherState = localStorage.getItem("switcherState");

// Set the switcher state based on the stored value (if available)
if (switcherState === "on") {
    switcher.checked = true;
    document.body.setAttribute("data-theme", "dark");
    
}

// Add an event listener to the switcher to save its state
switcher.addEventListener("change", function() {
    if (switcher.checked) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("switcherState", "on");
    } else {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("switcherState", "off");
    }
});


//tooltip 
class Tooltip extends HTMLElement {
  connectedCallback() {
    this.setup();
  }

  handleDropdownPosition() {
    const screenPadding = 16;

    const placeholderRect = this.placeholder.getBoundingClientRect();
    const dropdownRect = this.dropdown.getBoundingClientRect();

    const dropdownRightX = dropdownRect.x + dropdownRect.width;
    const placeholderRightX = placeholderRect.x + placeholderRect.width;

    if (dropdownRect.x < 0) {
      this.dropdown.style.left = '0';
      this.dropdown.style.right = 'auto';
      this.dropdown.style.transform = `translateX(${-placeholderRect.x + screenPadding}px)`;
    } else if (dropdownRightX > window.outerWidth) {
      this.dropdown.style.left = 'auto';
      this.dropdown.style.right = '0';
      this.dropdown.style.transform = `translateX(${(window.outerWidth - placeholderRightX) - screenPadding}px)`;
    }
      
  }

  toggle() {
    if (this.classList.contains('tooltip--open')) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.classList.add('tooltip--open');
    this.handleDropdownPosition();
  }

  close() {
    this.classList.remove('tooltip--open');
  }

  setup() {
    this.placeholder = this.querySelector('[data-tooltip-placeholder]');
    this.dropdown = this.querySelector('[data-tooltip-dropdown]');

    this.placeholder.addEventListener('mouseover', () => this.handleDropdownPosition());
    this.placeholder.addEventListener('touchstart', () => this.toggle());
  }
}

function dismissAllTooltips(event) {
  if (typeof event.target.closest !== 'function') return;
  const currentTooltip = event.target.closest('carwow-tooltip');

  document.querySelectorAll('.tooltip--open').forEach(tooltip => {
    if (tooltip === currentTooltip) return;

    tooltip.classList.remove('tooltip--open');
  });
}

customElements.define('wow-tooltip', Tooltip);
document.addEventListener('touchstart', e =>   dismissAllTooltips(e));


//Quiz

//results
let correctAnswers = 0;
let wrongAnswers = 0;
let ansScore = 0;
let timeUsed = 0;
let grade = 0;
let countdown = 0;
let performance = 0;
let remainingTime;

//timer
window.onload = function() {
    // Check if start time is stored in local storage
    remainingTime = localStorage.getItem("remainingTime");

    if (!remainingTime) {
        // If start time is not stored, set the current time as the start time
        remainingTime = 60;
        localStorage.setItem("remainingTime", remainingTime);
    }
    countdown = setInterval(function() {
        remainingTime--;
        document.getElementById("timer").innerHTML = "Time remaining: " + remainingTime + " seconds";
        if (remainingTime == 0) {
            clearInterval(countdown);
            document.getElementById("submit-btn").click();
            localStorage.setItem("remainingTime", 60);
        }
        localStorage.setItem("remainingTime", remainingTime);
    }, 1000);
}

// popup
let closePopup = document.getElementById("popupclose");
let overlay = document.getElementById("overlay");
let popup = document.getElementById("popup");
let subbutton = document.getElementById("submit-btn");
// Close Popup Event
closePopup.onclick = function() {
    localStorage.setItem("remainingTime", 60);
    window.close();
};

// results inside popup overlay
subbutton.onclick = function() {
    clearInterval(countdown)
    timeUsed = 60-remainingTime;
    overlay.style.display = 'block';
    popup.style.display = 'block';
    ansScore = correctAnswers*4;
	grade = correctAnswers*10;
    document.getElementById("rslt").innerHTML = "<br>Questions: "+questionCount+"<br><br>Correct answers: " + correctAnswers + "<br><br>Wrong answers: " + wrongAnswers + "<br><br>Score: " + ansScore + "<br><br>Grade: " + grade +"%" + "<br><br>You took " + timeUsed + " s" + "<br><br> " ;
    const paragraph = document.getElementById("rslt2");
	if (grade>69){
		performance="Excellent Mark, Keep up the good work!";
		paragraph.style.color="green";
	} else if(grade>39){
		performance="Good Mark, You can do better!";
		paragraph.style.color="orange";
	} else {
		performance="Bad Mark, Try harder!";
		paragraph.style.color="red";
	}
	document.getElementById("rslt2").innerHTML = performance;
}

//disable button
function disableButtons(button) {
  const buttonContainer = button.parentNode;
  const buttons = buttonContainer.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.style.pointerEvents = "none";
  });
}

//questions pool
const questionPool = [
  {
    question: "Question 1",
    answers: [
      { id: "button1-1", text: "Answer 1" },
      { id: "button1-2", text: "Answer 2" },
      { id: "button1-3", text: "Answer 3" },
      { id: "button1-4", text: "Answer 4" }
    ],
    correctAnswer: "button1-2"
  },
  {
    question: "Question 2",
    answers: [
      { id: "button2-1", text: "Answer 1" },
      { id: "button2-2", text: "Answer 2" },
      { id: "button2-3", text: "Answer 3" },
      { id: "button2-4", text: "Answer 4" }
    ],
    correctAnswer: "button2-4"
  },
  {
    question: "Question 3",
    answers: [
      { id: "button3-1", text: "Answer 1" },
      { id: "button3-2", text: "Answer 2" },
      { id: "button3-3", text: "Answer 3" },
      { id: "button3-4", text: "Answer 4" }
    ],
    correctAnswer: "button3-1"
  },
  {
    question: "Question 4",
    answers: [
      { id: "button4-1", text: "Answer 1" },
      { id: "button4-2", text: "Answer 2" },
      { id: "button4-3", text: "Answer 3" },
      { id: "button4-4", text: "Answer 4" }
    ],
    correctAnswer: "button4-2"
  },
  {
    question: "Question 5",
    answers: [
      { id: "button5-1", text: "Answer 1" },
      { id: "button5-2", text: "Answer 2" },
      { id: "button5-3", text: "Answer 3" },
      { id: "button5-4", text: "Answer 4" }
    ],
    correctAnswer: "button5-4"
  },
  // Add more questions here...
];

// Get the questionCount from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const questionCount = parseInt(urlParams.get('questionCount'));

// Function to select random questions from the pool
function selectQuestions() {
  const poolCopy = [...questionPool];
  const selectedQuestions = [];

  for (let i = 0; i < questionCount; i++) {
    const randomIndex = Math.floor(Math.random() * poolCopy.length);
    const selectedQuestion = poolCopy.splice(randomIndex, 1)[0];
    selectedQuestions.push(selectedQuestion);
  }

  return selectedQuestions;
}

// Check if the questions are already stored in sessionStorage
const storedQuestions = sessionStorage.getItem('quizQuestions');

if (storedQuestions) {
  // If questions are stored, parse them and display
  const displayedQuestions = JSON.parse(storedQuestions);
  displayQuestions(displayedQuestions);
} else {
  // If questions are not stored, select new questions, store them, and display
  const displayedQuestions = selectQuestions();
  sessionStorage.setItem('quizQuestions', JSON.stringify(displayedQuestions));
  displayQuestions(displayedQuestions);
}

function displayQuestions(displayedQuestions) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';

  for (let i = 0; i < displayedQuestions.length; i++) {
    const question = displayedQuestions[i];
    const questionElement = document.createElement('div');
    questionElement.textContent = question.question;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('btn-grid');

    for (let j = 0; j < question.answers.length; j++) {
      const answer = question.answers[j];
      const answerButton = document.createElement('button');
      answerButton.classList.add('btn');
      answerButton.id = answer.id;
      answerButton.textContent = answer.text;
      answerButton.addEventListener('click', function() {
        checkAnswer(answerButton, question.correctAnswer);
      });

      buttonContainer.appendChild(answerButton);
    }

    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(buttonContainer);
  }
}

function checkAnswer(button, correctAnswer) {
  if (button.id === correctAnswer) {
    button.style.backgroundColor = "green";
    correctAnswers += 1;
  } else {
    button.style.backgroundColor = "red";
    wrongAnswers += 1;

    // Find the correct answer button and highlight it
    const buttonContainer = button.parentNode;
    const buttons = buttonContainer.querySelectorAll("button");
    buttons.forEach((btn) => {
      if (btn.id === correctAnswer) {
        btn.style.backgroundColor = "green";
      }
      btn.style.pointerEvents = "none";
    });
  }

  disableButtons(button);//disable buttons after selecting a question
}

//get number of questions from user and redirect
document.getElementById("quizForm").onclick = (function(event) {
  event.preventDefault();
  var questionCount = document.getElementById("qCount").value;
  window.location.href = "Quiz.html?questionCount=" + questionCount;
});
