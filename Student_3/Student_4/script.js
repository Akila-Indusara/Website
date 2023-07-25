//go to top----------------------------------------------------------------------
// Get the button
let mybutton = document.getElementById("toTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//nav bar--------------------------------------------------------------------------
function menuMobile() {
    let nav = document.getElementById("myTopnav");
    if (nav.className === "topnav") {
        nav.className += " responsive";
    } else {
        nav.className = "topnav";
    }
}

//theme switch-------------------------------------------------------------------

// Check if the switcher state is stored in localStorage
let switcherState = localStorage.getItem("switcherState");

let col1 = localStorage.getItem("col1");
let col2 = localStorage.getItem("col2");
let col3 = localStorage.getItem("col3");
let col4 = localStorage.getItem("col4");
let col5 = localStorage.getItem("col5");
let col6 = localStorage.getItem("col6");

// Set the switcher state based on the stored value (if available)
if (switcherState === "dark") {
    document.getElementById("switcher-dark").checked = true;
    document.body.setAttribute("data-theme", "dark");   
}
if (switcherState === "light") {
    document.getElementById("switcher-light").checked = true;
    document.body.setAttribute("data-theme", "light");   
}
if (switcherState === "colorful") {
    document.getElementById("switcher-colorful").checked = true;
    document.body.setAttribute("data-theme", "colorful");   
}
if (switcherState === "random") {
    document.getElementById("switcher-random").checked = true;
    document.body.setAttribute("data-theme", "random"); 
    let root = document.documentElement;
    root.style.setProperty("--color-1", col1);
    root.style.setProperty("--color-2", col2);
    root.style.setProperty("--color-3", col3);
    root.style.setProperty("--color-4", col4);
    root.style.setProperty("--color-5", col5);
    root.style.setProperty("--color-6", col6);
}


 // Get all radio buttons
const radioButtons = document.querySelectorAll('input[name="theme-switcher"]');

// Add event listener to each radio button
radioButtons.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        console.log('Selected value:', selectedValue);

        // Perform actions based on the selected value
        if (selectedValue === 'light') {
            document.body.setAttribute("data-theme", "light");
            localStorage.setItem("switcherState", "light");
        } else if (selectedValue === 'dark') {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("switcherState", "dark");
        } else if (selectedValue === 'colorful') {
            document.body.setAttribute("data-theme", "colorful");
            localStorage.setItem("switcherState", "colorful");
        } else if (selectedValue === 'random') {
            document.body.setAttribute("data-theme", "random");
            localStorage.setItem("switcherState", "random");
            let root = document.documentElement;
            let col1 = getRandomColor();
            root.style.setProperty("--color-1", col1);
            localStorage.setItem("col1", col1);
            let col2 = getRandomColor();
            root.style.setProperty("--color-2", col2);
            localStorage.setItem("col2", col2);
            let col3 = getRandomColor();
            root.style.setProperty("--color-3", col3);
            localStorage.setItem("col3", col3);
            let col4 = getRandomColor();
            root.style.setProperty("--color-4", col4);
            localStorage.setItem("col4", col4);
            let col5 = getRandomColor();
            root.style.setProperty("--color-5", col5);
            localStorage.setItem("col5", col5);
            let col6 = getRandomColor();
            root.style.setProperty("--color-6", col6);
            localStorage.setItem("col6", col6);
        }
    });
});

// Function to generate a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//tooltip ------------------------------------------------------------------------------------------
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


//Quiz-------------------------------------------------------------------------------------------------

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
        if (remainingTime <= 0) {
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
const other = [
  {
    question: "Which famous Hollywood actress was originally considered for the role of Holly Golightly in \"Breakfast at Tiffany's\" before Audrey Hepburn was cast?",
    answers: [
      { id: "button1", text: "A) Marilyn Monroe" },
      { id: "button2", text: "B) Grace Kelly" },
      { id: "button3", text: "C) Elizabeth Taylor" },
      { id: "button4", text: "D) Audrey Hepburn" }
    ],
    correctAnswer: "button1"
  },
  {
    question: "In \"Titanic,\" what was the name of the ship's captain who famously shouted, \"She's made of iron, sir! I assure you she can and will sink!\"?",
    answers: [
      { id: "button1", text: "A) Captain Charles Lightoller" },
      { id: "button2", text: "B) Captain Thomas Andrews" },
      { id: "button3", text: "C) Captain William Murdoch" },
      { id: "button4", text: "D) Captain Edward James Smith" }
    ],
    correctAnswer: "button4"
  },
  {
    question: "Which song from \"La La Land\" won the Academy Award for Best Original Song in 2017?",
    answers: [
      { id: "button1", text: "A) \"City of Stars\"" },
      { id: "button2", text: "B) \"Another Day of Sun\"" },
      { id: "button3", text: "C) \"Audition (The Fools Who Dream)\"" },
      { id: "button4", text: "D) \"Mia & Sebastian's Theme\"" }
    ],
    correctAnswer: "button1"
  },
  {
    question: "In \"The Notebook,\" what is the name of the retirement home where elderly Allie and Noah reside?",
    answers: [
      { id: "button1", text: "A) Creekside Manor" },
      { id: "button2", text: "B) Rosewood Estates" },
      { id: "button3", text: "C) Willowbrook Gardens" },
      { id: "button4", text: "D) Shady Pines Senior Living" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "Which iconic romantic drama is based on the sinking of the RMS Titanic?",
    answers: [
      { id: "button1", text: "A) The Notebook" },
      { id: "button2", text: "B) Breakfast at Tiffany's" },
      { id: "button3", text: "C) La La Land" },
      { id: "button4", text: "D) Titanic" }
    ],
    correctAnswer: "button4"
  },
    {
    question: "In which film does Ryan Gosling's character own a jazz club and Emma Stone's character aspire to become an actress?",
    answers: [
      { id: "button1", text: "A) The Notebook" },
      { id: "button2", text: "B) Breakfast at Tiffany's" },
      { id: "button3", text: "C) La La Land" },
      { id: "button4", text: "D) Titanic" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Audrey Hepburn's famous little black dress is a standout fashion moment from which classic film?",
    answers: [
      { id: "button1", text: "A) The Notebook" },
      { id: "button2", text: "B) Breakfast at Tiffany's" },
      { id: "button3", text: "C) La La Land" },
      { id: "button4", text: "D) Titanic" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Which movie features a poignant love story set in the 1940s and centers around Noah and Allie?",
    answers: [
      { id: "button1", text: "A) The Notebook" },
      { id: "button2", text: "B) Breakfast at Tiffany's" },
      { id: "button3", text: "C) La La Land" },
      { id: "button4", text: "D) Titanic" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "In \"La La Land,\" what type of business does Sebastian plan to open?",
    answers: [
      { id: "button1", text: "A) A vintage clothing store" },
      { id: "button2", text: "B) A jazz club" },
      { id: "button3", text: "C) A coffee shop" },
      { id: "button4", text: "D) An art gallery" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "How many Oscars did \"Titanic\" win at the 1998 Academy Awards?",
    answers: [
      { id: "button1", text: "A) 7" },
      { id: "button2", text: "B) 9" },
      { id: "button3", text: "C) 11" },
      { id: "button4", text: "D) 13" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Who directed the movie \"Dune\" released in 2021?",
    answers: [
      { id: "button1", text: "A) Steven Spielberg" },
      { id: "button2", text: "B) Christopher Nolan" },
      { id: "button3", text: "C) Denis Villeneuve" },
      { id: "button4", text: "D) James Cameron" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "What is the name of the desert planet where the story of \"Dune\" takes place?",
    answers: [
      { id: "button1", text: "A) Endor" },
      { id: "button2", text: "B) Tatooine" },
      { id: "button3", text: "C) Arrakis" },
      { id: "button4", text: "D) Hoth" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Who plays the character of Paul Atreides in the movie?",
    answers: [
      { id: "button1", text: "A) Tom Holland" },
      { id: "button2", text: "B) Timothée Chalamet" },
      { id: "button3", text: "C) Robert Pattinson" },
      { id: "button4", text: "D) Chris Hemsworth" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "What is the valuable resource found on the planet Arrakis?",
    answers: [
      { id: "button1", text: "A) Gold" },
      { id: "button2", text: "B) Water" },
      { id: "button3", text: "C) Melange (Spice)" },
      { id: "button4", text: "D) Diamonds" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "What is Paul Atreides' prophesied role in the story?",
    answers: [
      { id: "button1", text: "A) A Jedi Knight" },
      { id: "button2", text: "B) The Chosen One" },
      { id: "button3", text: "C) The Kwisatz Haderach" },
      { id: "button4", text: "D) The Dark Lord" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Which noble house is the rival of House Atreides?",
    answers: [
      { id: "button1", text: "A) House Stark" },
      { id: "button2", text: "B) House Lannister" },
      { id: "button3", text: "C) House Harkonnen" },
      { id: "button4", text: "D) House Targaryen" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Who composed the music for the movie \"Dune\"?",
    answers: [
      { id: "button1", text: "A) Hans Zimmer" },
      { id: "button2", text: "B) John Williams" },
      { id: "button3", text: "C) Alan Silvestri" },
      { id: "button4", text: "D) Howard Shore" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "What themes are explored in the movie \"Dune\"?",
    answers: [
      { id: "button1", text: "A) Romance and Comedy" },
      { id: "button2", text: "B) Politics, Religion, and Ecology" },
      { id: "button3", text: "C) Action and Adventure" },
      { id: "button4", text: "D) Horror and Thriller" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "What is the name of Paul Atreides' mother and her affiliation?",
    answers: [
      { id: "button1", text: "A) Lady Sansa, member of the Jedi Order" },
      { id: "button2", text: "B) Lady Jessica, member of the Bene Gesserit sisterhood" },
      { id: "button3", text: "C) Lady Leia, member of the Galactic Senate" },
      { id: "button4", text: "D) Lady Arya, member of the Night's Watch" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "How is \"Dune\" (2021) received by audiences and critics?",
    answers: [
      { id: "button1", text: "A) Critically panned, disliked by audiences" },
      { id: "button2", text: "B) Moderately received, mixed reviews" },
      { id: "button3", text: "C) Commercial failure, but praised by critics" },
      { id: "button4", text: "D) Acclaimed by both audiences and critics as a modern classic" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Who directed the movie \"Avengers: Endgame\"?",
    answers: [
      { id: "button1", text: "A) Christopher Nolan" },
      { id: "button2", text: "B) James Cameron" },
      { id: "button3", text: "C) Steven Spielberg" },
      { id: "button4", text: "D) Russo Brothers" }
    ],
    correctAnswer: "button4"
  },
    {
    question: "What is the total box office earnings of \"Avengers: Endgame\"?",
    answers: [
      { id: "button1", text: "A) $2.798 billion USD" },
      { id: "button2", text: "B) $2.789 billion USD" },
      { id: "button3", text: "C) $2.879 billion USD" },
      { id: "button4", text: "D) $2.897 billion USD" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "Which character sacrifices himself to snap Thanos and his army out of existence?",
    answers: [
      { id: "button1", text: "A) Bruce Banner (Hulk)" },
      { id: "button2", text: "B) Natasha Romanoff (Black Widow)" },
      { id: "button3", text: "C) Steve Rogers (Captain America)" },
      { id: "button4", text: "D) Tony Stark (Iron Man)" }
    ],
    correctAnswer: "button4"
  },
    {
    question: "What is the working title used during the production of \"Avengers: Endgame\" to avoid leaks?",
    answers: [
      { id: "button1", text: "A) Avengers: Reassemble" },
      { id: "button2", text: "B) Mary Lou" },
      { id: "button3", text: "C) Avengers: Endgame" },
      { id: "button4", text: "D) Avengers: Final Battle" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "What is the runtime of \"Avengers: Endgame\"?",
    answers: [
      { id: "button1", text: "A) 181 minutes" },
      { id: "button2", text: "B) 171 minutes" },
      { id: "button3", text: "C) 182 minutes" },
      { id: "button4", text: "D) 172 minutes" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "Which character brings Tony Stark and Nebula back to Earth in the movie \"Avengers: Endgame\"?",
    answers: [
      { id: "button1", text: "A) Captain Marvel" },
      { id: "button2", text: "B) Doctor Strange" },
      { id: "button3", text: "C) Thor" },
      { id: "button4", text: "D) Spider-Man" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "Who plays the character of Natasha Romanoff (Black Widow) in the movie \"Avengers: Endgame\"?",
    answers: [
      { id: "button1", text: "A) Scarlett Johansson" },
      { id: "button2", text: "B) Elizabeth Olsen" },
      { id: "button3", text: "C) Zendaya" },
      { id: "button4", text: "D) Gwyneth Paltrow" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "What is the main objective of the Avengers in the movie \"Avengers: Endgame\"?",
    answers: [
      { id: "button1", text: "A) To collect Infinity Stones for Thanos" },
      { id: "button2", text: "B) To defeat Loki and his army" },
      { id: "button3", text: "C) To travel back in time and retrieve the Infinity Stones" },
      { id: "button4", text: "D) To conquer the universe" }
    ],
    correctAnswer: "button3"
  },
    
  // Add more questions here...
];

const fantasy = [
  {
    question: "Who directed the Lord of the Rings trilogy?",
    answers: [
      { id: "button1", text: "A) Christopher Nolan" },
      { id: "button2", text: "B) James Cameron" },
      { id: "button3", text: "C) Peter Jackson" },
      { id: "button4", text: "D) Steven Spielberg" }
    ],
    correctAnswer: "button3"
  },
  {
    question: "What is the budget total for the three films in the Lord of the Rings trilogy?",
    answers: [
      { id: "button1", text: "A) $2.993 billion USD" },
      { id: "button2", text: "B) $2.939 billion USD" },
      { id: "button3", text: "C) $2.999 billion USD" },
      { id: "button4", text: "D) $2.933 billion USD" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "Who is the author of \"The Lord of the Rings\" book on which the movies are based?",
    answers: [
      { id: "button1", text: "A) J.K. Rowling" },
      { id: "button2", text: "B) George R.R. Martin" },
      { id: "button3", text: "C) J.R.R. Tolkien" },
      { id: "button4", text: "D) C.S. Lewis" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Which character in the trilogy is portrayed by Ian McKellen?",
    answers: [
      { id: "button1", text: "A) Frodo Baggins" },
      { id: "button2", text: "B) Gandalf" },
      { id: "button3", text: "C) Aragorn" },
      { id: "button4", text: "D) Legolas" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "Which movie in the trilogy marks the beginning of the adventure?",
    answers: [
      { id: "button1", text: "A) The Fellowship of the Ring" },
      { id: "button2", text: "B) The Two Towers" },
      { id: "button3", text: "C) The Return of the King" },
      { id: "button4", text: "D) The Battle of Helm's Deep" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "Which actor plays the character of Frodo Baggins in the trilogy?",
    answers: [
      { id: "button1", text: "A) Sean Astin" },
      { id: "button2", text: "B) Elijah Wood" },
      { id: "button3", text: "C) Dominic Monaghan" },
      { id: "button4", text: "D) Billy Boyd" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "What is the name of the dark lord seeking the One Ring in the trilogy?",
    answers: [
      { id: "button1", text: "A) Voldemort" },
      { id: "button2", text: "B) Saruman" },
      { id: "button3", text: "C) Gollum" },
      { id: "button4", text: "D) Sauron" }
    ],
    correctAnswer: "button4"
  },
    {
    question: "Which movie in the trilogy showcases the epic Battle of Helm's Deep?",
    answers: [
      { id: "button1", text: "A) The Fellowship of the Ring" },
      { id: "button2", text: "B) The Two Towers" },
      { id: "button3", text: "C) An Unexpected Journey" },
      { id: "button4", text: "D) The Desolation of Smaug" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "Who portrays the character Gollum in the trilogy?",
    answers: [
      { id: "button1", text: "A) Viggo Mortensen" },
      { id: "button2", text: "B) Orlando Bloom" },
      { id: "button3", text: "C) Christopher Lee" },
      { id: "button4", text: "D) Andy Serkis" }
    ],
    correctAnswer: "button4"
  },
    {
    question: "What is the overarching theme explored throughout the Lord of the Rings trilogy?",
    answers: [
      { id: "button1", text: "A) Love conquers all" },
      { id: "button2", text: "B) The triumph of evil" },
      { id: "button3", text: "C) The power of friendship and sacrifice" },
      { id: "button4", text: "D) Political intrigue and treachery" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Who directed \"The Hobbit\" trilogy?",
    answers: [
      { id: "button1", text: "A) Christopher Nolan" },
      { id: "button2", text: "B) James Cameron" },
      { id: "button3", text: "C) Peter Jackson" },
      { id: "button4", text: "D) Steven Spielberg" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Who portrays the character Bilbo Baggins in \"The Hobbit\" trilogy?",
    answers: [
      { id: "button1", text: "A) Ian McKellen" },
      { id: "button2", text: "B) Martin Freeman" },
      { id: "button3", text: "C) Elijah Wood" },
      { id: "button4", text: "D) Benedict Cumberbatch" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "What is the budget total for the three films in \"The Hobbit\" trilogy?",
    answers: [
      { id: "button1", text: "A) $769–775 million USD" },
      { id: "button2", text: "B) $720 million USD" },
      { id: "button3", text: "C) $776 million USD" },
      { id: "button4", text: "D) $700–745 million USD" }
    ],
    correctAnswer: "button4"
  },
    {
    question: "In which movie of \"The Hobbit\" trilogy do the characters encounter the fearsome dragon \"Smaug\"?",
    answers: [
      { id: "button1", text: "A) The Hobbit 1 (2012): An Unexpected Journey" },
      { id: "button2", text: "B) The Hobbit 2 (2013): The Desolation of Smaug" },
      { id: "button3", text: "C) The Hobbit 3 (2014): The Battle of the Five Armies" },
      { id: "button4", text: "D) The Hobbit 4: Return of the Dragon" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "Which actor portrays the character Gollum in \"The Hobbit\" trilogy?",
    answers: [
      { id: "button1", text: "A) Orlando Bloom" },
      { id: "button2", text: "B) Richard Armitage" },
      { id: "button3", text: "C) Aidan Turner" },
      { id: "button4", text: "D) Andy Serkis" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "What is the subtitle of the third movie in \"The Hobbit\" trilogy?",
    answers: [
      { id: "button1", text: "A) An Unexpected Journey" },
      { id: "button2", text: "B) The Desolation of Smaug" },
      { id: "button3", text: "C) The Return of the King" },
      { id: "button4", text: "D) The Battle of the Five Armies" }
    ],
    correctAnswer: "button4"
  },
    {
    question: "Who is the main antagonist, a powerful dragon, in \"The Hobbit\" trilogy?",
    answers: [
      { id: "button1", text: "A) Azog the Defiler" },
      { id: "button2", text: "B) Smaug" },
      { id: "button3", text: "C) Saruman" },
      { id: "button4", text: "D) Thranduil" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "Which character leads the company of dwarves on their quest to reclaim the Dwarf Kingdom of Erebor?",
    answers: [
      { id: "button1", text: "A) Frodo Baggins" },
      { id: "button2", text: "B) Gandalf" },
      { id: "button3", text: "C) Thorin Oakenshield" },
      { id: "button4", text: "D) Legolas" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "What is the name of the human settlement ruled by the Master, where the company seeks aid in \"The Hobbit\" trilogy?",
    answers: [
      { id: "button1", text: "A) Mirkwood Forest" },
      { id: "button2", text: "B) The Lonely Mountain" },
      { id: "button3", text: "C) Lake-town" },
      { id: "button4", text: "D) The Misty Mountains" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Who is the main protagonist in the \"Pirates of the Caribbean\" film series?",
    answers: [
      { id: "button1", text: "A) Davy Jones" },
      { id: "button2", text: "B) Captain Barbossa" },
      { id: "button3", text: "C) Captain Jack Sparrow" },
      { id: "button4", text: "D) Will Turner" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Which installment of the \"Pirates of the Caribbean\" series introduces the character of Captain Salazar, portrayed by Javier Bardem?",
    answers: [
      { id: "button1", text: "A) Pirates of the Caribbean 1 (2003): The Curse of the Black Pearl" },
      { id: "button2", text: "B) Pirates of the Caribbean 3 (2007): At World's End" },
      { id: "button3", text: "C) Pirates of the Caribbean 4 (2011): On Stranger Tides" },
      { id: "button4", text: "D) Pirates of the Caribbean 5 (2017): Dead Men Tell No Tales" }
    ],
    correctAnswer: "button4"
  },
    {
    question: "Who directed the first three films in the \"Pirates of the Caribbean\" series?",
    answers: [
      { id: "button1", text: "A) Gore Verbinski" },
      { id: "button2", text: "B) Rob Marshall" },
      { id: "button3", text: "C) Espen Sandberg" },
      { id: "button4", text: "D) Joachim Rønning" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "Which actor portrays Captain Barbossa, the infamous pirate, in the \"Pirates of the Caribbean\" film series?",
    answers: [
      { id: "button1", text: "A) Johnny Depp" },
      { id: "button2", text: "B) Orlando Bloom" },
      { id: "button3", text: "C) Geoffrey Rush" },
      { id: "button4", text: "D) Bill Nighy" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "In \"Pirates of the Caribbean: On Stranger Tides\" (2011), what are Captain Jack Sparrow and his crew searching for?",
    answers: [
      { id: "button1", text: "A) The Fountain of Youth" },
      { id: "button2", text: "B) The Lost Treasure of El Dorado" },
      { id: "button3", text: "C) The Cursed Aztec Gold" },
      { id: "button4", text: "D) The Heart of Davy Jones" }
    ],
    correctAnswer: "button1"
  },
    {
    question: "Which actress plays the character of Angelica, a beautiful and enigmatic pirate, in \"Pirates of the Caribbean: On Stranger Tides\"?",
    answers: [
      { id: "button1", text: "A) Keira Knightley" },
      { id: "button2", text: "B) Penélope Cruz" },
      { id: "button3", text: "C) Naomie Harris" },
      { id: "button4", text: "D) Kaya Scodelario" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "In \"Pirates of the Caribbean 2 (2006): Dead Man's Chest,\" what does Captain Jack Sparrow owe to Davy Jones?",
    answers: [
      { id: "button1", text: "A) A map to a hidden treasure" },
      { id: "button2", text: "B) His ship, the Black Pearl" },
      { id: "button3", text: "C) The heart of Davy Jones" },
      { id: "button4", text: "D) A debt of gold and treasure" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Which installment in the series features the pirate lord Sao Feng, portrayed by Chow Yun-fat?",
    answers: [
      { id: "button1", text: "A) Pirates of the Caribbean 1 (2003): The Curse of the Black Pearl" },
      { id: "button2", text: "B) Pirates of the Caribbean 2 (2006): Dead Man's Chest" },
      { id: "button3", text: "C) Pirates of the Caribbean 3 (2007): At World's End" },
      { id: "button4", text: "D) Pirates of the Caribbean 4 (2011): On Stranger Tides" }
    ],
    correctAnswer: "button3"
  },
    {
    question: "Who is the main antagonist in \"Pirates of the Caribbean 4 (2011): On Stranger Tides\"?",
    answers: [
      { id: "button1", text: "A) Captain Salazar" },
      { id: "button2", text: "B) Blackbeard" },
      { id: "button3", text: "C) Davy Jones" },
      { id: "button4", text: "D) Captain Barbossa" }
    ],
    correctAnswer: "button2"
  },
    {
    question: "Who produced the \"Pirates of the Caribbean\" film series?",
    answers: [
      { id: "button1", text: "A) Gore Verbinski" },
      { id: "button2", text: "B) Rob Marshall" },
      { id: "button3", text: "C) Peter Jackson" },
      { id: "button4", text: "D) Jerry Bruckheimer" }
    ],
    correctAnswer: "button4"
  },
  // Add more questions here...
];

// Get the questionCount from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const questionCount = parseInt(urlParams.get('questionCount'));
const urlParams1 = new URLSearchParams(window.location.search);
const category = parseInt(urlParams1.get("category"));

function selectQuestions() {
    //choose question pool
    if (category===1){
        poolCopy = [...fantasy];
    } else if (category===2){
        poolCopy = [...other];
    }
    const selectedQuestions = [];
// Function to select random questions from the pool
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
    questionElement.textContent = (i+1) + ") " + question.question;

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
    const lineBreak = document.createElement("br");
    quizContainer.appendChild(lineBreak);
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
