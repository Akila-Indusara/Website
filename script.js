//nav bar
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//theme switch
// Retrieve the switcher element
var switcher = document.getElementById("switcher");

// Check if the switcher state is stored in localStorage
var switcherState = localStorage.getItem("switcherState");

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



//results

var correctAnswers = 0;
var wrongAnswers = 0;
var ansScore = 0;
var timeUsed = 0;
var grade = 0;
var seconds = 60;
var countdown = 0;
var performance = 0;

//timer
window.onload = function() {
    countdown = setInterval(function() {
        seconds--;
        document.getElementById("timer").innerHTML = "Time remaining: " + seconds + " seconds";
        if (seconds == 0) {
            clearInterval(countdown);
            document.getElementById("submit-btn").click();
        }
    }, 1000);
}

// popup
var closePopup = document.getElementById("popupclose");
var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");
var button = document.getElementById("submit-btn");
// Close Popup Event
closePopup.onclick = function() {
	window.location.href = "Quiz_details.html";
};
// Show Overlay and Popup
button.onclick = function() {
    clearInterval(countdown)
    timeUsed = 60-seconds;
    overlay.style.display = 'block';
    popup.style.display = 'block';
    ansScore = correctAnswers*4;
	grade = correctAnswers*10;
	if (grade>69){
		performance="Excellent Mark, Keep up the good work!";
		clz = "excellent";
	} else if(grade>39){
		performance="Good Mark, You can do better!";
		clz = "good";
	} else {
		performance="Bad Mark, Try harder!";
		clz = "bad";
	}
    document.getElementById("rslt").innerHTML = "<br>Correct answers: " + correctAnswers + "<br><br>Wrong answers: " + wrongAnswers + "<br><br>Score: " + ansScore + "<br><br>Grade: " + grade +"%" + "<br><br>You took " + timeUsed + " s" + "<br><br> " ;
	document.getElementById("rslt2").innerHTML = performance;
	document.getElementById("rslt2").className = clz;
}



//answers

let correctAnswer1 = "button1-2";
let correctAnswer2 = "button2-4";
let correctAnswer3 = "button3-1";
let correctAnswer4 = "button4-3";
let correctAnswer5 = "button5-3";
let correctAnswer6 = "button6-1";
let correctAnswer7 = "button7-2";
let correctAnswer8 = "button8-4";
let correctAnswer9 = "button9-1";
let correctAnswer10 = "button10-3";

//answer1
function checkAnswer1(button) {
  if (button.id === correctAnswer1) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button1-1").style.pointerEvents = "none";
    document.getElementById("button1-2").style.pointerEvents = "none";
    document.getElementById("button1-3").style.pointerEvents = "none";
    document.getElementById("button1-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button1-1").style.pointerEvents = "none";
    document.getElementById("button1-2").style.pointerEvents = "none";
    document.getElementById("button1-3").style.pointerEvents = "none";
    document.getElementById("button1-4").style.pointerEvents = "none";
  }

}


//answer2
function checkAnswer2(button) {
  if (button.id === correctAnswer2) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button2-1").style.pointerEvents = "none";
    document.getElementById("button2-2").style.pointerEvents = "none";
    document.getElementById("button2-3").style.pointerEvents = "none";
    document.getElementById("button2-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button2-1").style.pointerEvents = "none";
    document.getElementById("button2-2").style.pointerEvents = "none";
    document.getElementById("button2-3").style.pointerEvents = "none";
    document.getElementById("button2-4").style.pointerEvents = "none";
  }

}



//answer3
function checkAnswer3(button) {
  if (button.id === correctAnswer3) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button3-1").style.pointerEvents = "none";
    document.getElementById("button3-2").style.pointerEvents = "none";
    document.getElementById("button3-3").style.pointerEvents = "none";
    document.getElementById("button3-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button3-1").style.pointerEvents = "none";
    document.getElementById("button3-2").style.pointerEvents = "none";
    document.getElementById("button3-3").style.pointerEvents = "none";
    document.getElementById("button3-4").style.pointerEvents = "none";
  }

}



//answer4
function checkAnswer4(button) {
  if (button.id === correctAnswer4) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button4-1").style.pointerEvents = "none";
    document.getElementById("button4-2").style.pointerEvents = "none";
    document.getElementById("button4-3").style.pointerEvents = "none";
    document.getElementById("button4-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button4-1").style.pointerEvents = "none";
    document.getElementById("button4-2").style.pointerEvents = "none";
    document.getElementById("button4-3").style.pointerEvents = "none";
    document.getElementById("button4-4").style.pointerEvents = "none";
  }

}



//answer5
function checkAnswer5(button) {
  if (button.id === correctAnswer5) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button5-1").style.pointerEvents = "none";
    document.getElementById("button5-2").style.pointerEvents = "none";
    document.getElementById("button5-3").style.pointerEvents = "none";
    document.getElementById("button5-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button5-1").style.pointerEvents = "none";
    document.getElementById("button5-2").style.pointerEvents = "none";
    document.getElementById("button5-3").style.pointerEvents = "none";
    document.getElementById("button5-4").style.pointerEvents = "none";
  }

}



//answer6
function checkAnswer6(button) {
  if (button.id === correctAnswer6) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button6-1").style.pointerEvents = "none";
    document.getElementById("button6-2").style.pointerEvents = "none";
    document.getElementById("button6-3").style.pointerEvents = "none";
    document.getElementById("button6-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button6-1").style.pointerEvents = "none";
    document.getElementById("button6-2").style.pointerEvents = "none";
    document.getElementById("button6-3").style.pointerEvents = "none";
    document.getElementById("button6-4").style.pointerEvents = "none";
  }

}



//answer7
function checkAnswer7(button) {
  if (button.id === correctAnswer7) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button7-1").style.pointerEvents = "none";
    document.getElementById("button7-2").style.pointerEvents = "none";
    document.getElementById("button7-3").style.pointerEvents = "none";
    document.getElementById("button7-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button7-1").style.pointerEvents = "none";
    document.getElementById("button7-2").style.pointerEvents = "none";
    document.getElementById("button7-3").style.pointerEvents = "none";
    document.getElementById("button7-4").style.pointerEvents = "none";
  }

}



//answer8
function checkAnswer8(button) {
  if (button.id === correctAnswer8) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button8-1").style.pointerEvents = "none";
    document.getElementById("button8-2").style.pointerEvents = "none";
    document.getElementById("button8-3").style.pointerEvents = "none";
    document.getElementById("button8-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button8-1").style.pointerEvents = "none";
    document.getElementById("button8-2").style.pointerEvents = "none";
    document.getElementById("button8-3").style.pointerEvents = "none";
    document.getElementById("button8-4").style.pointerEvents = "none";
  }

}



//answer9
function checkAnswer9(button) {
  if (button.id === correctAnswer9) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button9-1").style.pointerEvents = "none";
    document.getElementById("button9-2").style.pointerEvents = "none";
    document.getElementById("button9-3").style.pointerEvents = "none";
    document.getElementById("button9-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button9-1").style.pointerEvents = "none";
    document.getElementById("button9-2").style.pointerEvents = "none";
    document.getElementById("button9-3").style.pointerEvents = "none";
    document.getElementById("button9-4").style.pointerEvents = "none";
  }

}



//answer10
function checkAnswer10(button) {
  if (button.id === correctAnswer10) {
    button.style.backgroundColor = "green";
	correctAnswers +=1;
    document.getElementById("button10-1").style.pointerEvents = "none";
    document.getElementById("button10-2").style.pointerEvents = "none";
    document.getElementById("button10-3").style.pointerEvents = "none";
    document.getElementById("button10-4").style.pointerEvents = "none";
  } else {
    button.style.backgroundColor = "red";	
	wrongAnswers +=1;
    document.getElementById("button10-1").style.pointerEvents = "none";
    document.getElementById("button10-2").style.pointerEvents = "none";
    document.getElementById("button10-3").style.pointerEvents = "none";
    document.getElementById("button10-4").style.pointerEvents = "none";
  }

}







