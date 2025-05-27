const lettersContainer = document.getElementById("letters");
const timerElement = document.getElementById("timer");
const categoryElement = document.getElementById("category");
const newRoundButton = document.getElementById("newRound");
const pauseButton = document.getElementById("pauseButton");
const normalModeButton = document.getElementById("normalModeButton");
const blackHumorModeButton = document.getElementById("blackHumorModeButton");
const backToModeSelectionButton = document.getElementById("backToModeSelection");

const italianLetters = "A,B,C,D,E,F,G,I,L,M,N,O,P,Q,R,S,T,U,V,Z".split(",");
let countdown;
let usedLetters = new Set();
let isPaused = false;
let remainingTime = 10;

const normalCategories = [
  "Frutti", "Città italiane", "Animali", "Cibi", "Professioni", "Film",
  "Sport", "Strumenti musicali", "Anime", "Siti Web", "Insulti", "Creature mitologiche",
  "Nazioni", "Videogiochi", "Band/Cantanti", "Canzoni", "Lavori", "Dialetti italiani",
  "Cose eccitanti", "Posti dove fare sesso", "Parole con 4 lettere", "Parole con 3 lettere",
  "Cose che trovi in bagno", "Cose appiccicose", "Parole difficili da scrivere",
  "Oggetti che fanno rumore", "Motivi per piangere", "Cose rosse", "Cose che non si mangiano",
  "Oggetti che si rompono facilmente", "Cose che puzzano", "Nomignoli affettuosi",
  "Oggetti tecnologici", "Cose da dire a un primo appuntamento", "Oggetti in una borsa",
  "Cose che non diresti a un matrimonio", "Attività da fare in gruppo", "Cose per cui si litiga",
  "Cose che brillano", "Luoghi rumorosi", "Mestieri dimenticati", "Cose che fanno ridere",
  "Abitudini strane", "Oggetti trovati in soffitta"
];

const blackHumorCategories = [
  "Frasi imbarazzanti",
  "Situazioni imbarazzanti al letto", "Parole volgari",
  "Situazioni da non raccontare a mamma", "Nomignoli sexy", "Motivi per evitare il sesso",
  "Cose strane da dire a un appuntamento", "Scuse assurde per non fare sesso",
  "Sesso e tecnologia", "Cose divertenti al buio", "Comportamenti imbarazzanti",
  "Passioni più grandi"
];

let currentMode = null; // "normal" o "blackHumor"

function resetLetters() {
  lettersContainer.innerHTML = "";
  usedLetters.clear();
  const radius = 200;
  const centerX = 230;
  const centerY = 230;

  italianLetters.forEach((letter, index) => {
    const angle = (2 * Math.PI / italianLetters.length) * index;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "letter";
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;

    btn.onclick = () => {
      btn.disabled = true;
      usedLetters.add(letter);
      resetTimer();
    };

    lettersContainer.appendChild(btn);
  });
}

function resetTimer() {
  clearInterval(countdown);
  remainingTime = 10;
  timerElement.textContent = remainingTime;
  countdown = setInterval(() => {
    if (!isPaused) {
      remainingTime--;
      timerElement.textContent = remainingTime;
      if (remainingTime <= 0) {
        clearInterval(countdown);
        endRound();
      }
    }
  }, 1000);
}

function endRound() {
  Array.from(lettersContainer.children).forEach(btn => btn.disabled = true);
}

function startNewRound() {
  let categories = currentMode === "normal" ? normalCategories : blackHumorCategories;

  const randomIndex = Math.floor(Math.random() * categories.length);
  categoryElement.textContent = categories[randomIndex];
  resetLetters();
  isPaused = false;
  pauseButton.textContent = "Pausa";
  resetTimer();
}

pauseButton.onclick = () => {
  if (!isPaused) {
    isPaused = true;
    pauseButton.textContent = "Continua";
  } else {
    isPaused = false;
    pauseButton.textContent = "Pausa";
  }
};

newRoundButton.onclick = startNewRound;

normalModeButton.onclick = () => {
  currentMode = "normal";
  document.body.classList.remove("black-humor");
  document.getElementById("modeSelection").classList.add("hidden");
  document.getElementById("gameArea").classList.remove("hidden");
  startNewRound();
};

blackHumorModeButton.onclick = () => {
  currentMode = "blackHumor";
  document.body.classList.add("black-humor");
  document.getElementById("modeSelection").classList.add("hidden");
  document.getElementById("gameArea").classList.remove("hidden");
  startNewRound();
};

backToModeSelectionButton.onclick = () => {
  clearInterval(countdown);
  document.body.classList.remove("black-humor");
  currentMode = null;
  document.getElementById("modeSelection").classList.remove("hidden");
  document.getElementById("gameArea").classList.add("hidden");
  categoryElement.textContent = 'Clicca "Nuovo Round" per iniziare';
  timerElement.textContent = '10';
  lettersContainer.innerHTML = "";
};
