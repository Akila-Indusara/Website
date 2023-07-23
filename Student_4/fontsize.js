var text = document.querySelector('.stu-hover');
var increase = document.querySelector('.increase');
var decrease = document.querySelector('.decrease');
var textSize = 20;
var clicks=0;

// for increase

increase.addEventListener('click', () => {
    textSize = textSize + 1;
    var texts = document.querySelectorAll('.stu-hover');
    texts.forEach(text => {
        text.style.fontSize = textSize + 'px';
        clicks++
      
    });
});


// for decrease
decrease.addEventListener('click', () => {
    textSize = textSize - 1;
    var texts = document.querySelectorAll('.stu-hover');
    texts.forEach(text => {
        text.style.fontSize = textSize + 'px';
    });
});

// Get the button
let mybutton = document.getElementById("mytn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
