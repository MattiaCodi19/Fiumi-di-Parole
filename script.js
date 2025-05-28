const lettersContainer = document.getElementById("letters");
const timerElement = document.getElementById("timer");
const categoryElement = document.getElementById("category");
const newRoundButton = document.getElementById("newRound");
const pauseButton = document.getElementById("pauseButton");
const normalModeButton = document.getElementById("normalModeButton");
const blackHumorModeButton = document.getElementById("blackHumorModeButton");
const footballModeButton = document.getElementById("footballModeButton");
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
  "Cose eccitanti", "Parole con 4 lettere", "Parole con 3 lettere",
  "Cose che trovi in bagno", "Cose appiccicose", "Parole difficili da scrivere",
  "Oggetti che fanno rumore", "Motivi per piangere", "Cose rosse", "Cose che non si mangiano",
  "Oggetti che si rompono facilmente", "Cose che puzzano", "Nomignoli affettuosi",
  "Oggetti tecnologici", "Cose da dire a un primo appuntamento", "Oggetti in una borsa",
  "Cose che non diresti a un matrimonio", "Attività da fare in gruppo", "Cose per cui si litiga",
  "Cose che brillano", "Luoghi rumorosi", "Mestieri dimenticati", "Cose che fanno ridere",
  "Abitudini strane", "Oggetti trovati in soffitta"
];

const blackHumorCategories = [
  "Frasi imbarazzanti", "Situazioni imbarazzanti a letto", "Parole volgari",
  "Cose che non diresti mai a tua madre", "Nomignoli sexy", "Motivi per evitare il sesso",
  "Scuse assurde per non farlo", "Oggetti erotici", "Errori durante il sesso",
  "Posti strani dove farlo", "Battute cattive su ex", "Fantasie strane",
  "Problemi imbarazzanti", "Momenti da censura", "Frasi da film porno",
  "Figure di merda epiche", "Battute nere", "Errori da prima volta",
  "Gaffe sessuali", "Cose che ti farebbero arrossire", "Frasi da dire solo in camera da letto"
];

const footballCategories = [
  "Squadre italiane", "Squadre europee", "Calciatori Juve", "Allenatori leggendari", "Calciatori Inter", "Calciatori Milan",
  "Stadi famosi", "Competizioni calcistiche", "Soprannomi dei calciatori",
  "Inni delle squadre", "Oggetti in uno spogliatoio", "Motivi per un cartellino rosso",
  "Esultanze famose", "Partite storiche", "Regole del calcio", "Posizioni in campo",
  "Errori arbitrali", "Tattiche calcistiche", "Soprannomi delle tifoserie",
  "Scuse dopo una sconfitta", "Insulti da stadio",
  "Cose che grida un allenatore", "Cose che dice un telecronista", "Cose che fa un portiere", 
  "Oggetti lanciati in campo", "Gesti tecnici", "Mosse disperate al 90esimo", "Squadre con maglia blu","Squadre con maglia rossa",
  "Squadre con maglia bianca", "Squadre che hanno vinto la Champions"
];

let currentMode = null; // "normal", "blackHumor", "football"

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
      btn.classList.add("clicked"); // cambia l'immagine
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
  let categories;

  if (currentMode === "normal") {
    categories = normalCategories;
  } else if (currentMode === "blackHumor") {
    categories = blackHumorCategories;
  } else if (currentMode === "football") {
    categories = footballCategories;
  }

  const randomIndex = Math.floor(Math.random() * categories.length);
  categoryElement.textContent = categories[randomIndex];
  resetLetters();
  isPaused = false;
  pauseButton.textContent = "Pausa";
  resetTimer();
}

pauseButton.onclick = () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Continua" : "Pausa";
};

newRoundButton.onclick = startNewRound;

normalModeButton.onclick = () => {
  currentMode = "normal";
  document.body.classList.remove("black-humor", "football");
  document.getElementById("modeSelection").classList.add("hidden");
  document.getElementById("gameArea").classList.remove("hidden");
  categoryElement.textContent = 'Clicca "Nuovo Round" per iniziare';
  timerElement.textContent = '10';
};

blackHumorModeButton.onclick = () => {
  currentMode = "blackHumor";
  document.body.classList.remove("football");
  document.body.classList.add("black-humor");
  document.getElementById("modeSelection").classList.add("hidden");
  document.getElementById("gameArea").classList.remove("hidden");
  categoryElement.textContent = 'Clicca "Nuovo Round" per iniziare';
  timerElement.textContent = '10';
};

footballModeButton.onclick = () => {
  currentMode = "football";
  document.body.classList.remove("black-humor");
  document.body.classList.add("football");
  document.getElementById("modeSelection").classList.add("hidden");
  document.getElementById("gameArea").classList.remove("hidden");
  categoryElement.textContent = 'Clicca "Nuovo Round" per iniziare';
  timerElement.textContent = '10';
};

backToModeSelectionButton.onclick = () => {
  clearInterval(countdown);
  document.body.classList.remove("black-humor", "football");
  currentMode = null;
  document.getElementById("modeSelection").classList.remove("hidden");
  document.getElementById("gameArea").classList.add("hidden");
  categoryElement.textContent = 'Clicca "Nuovo Round" per iniziare';
  timerElement.textContent = '10';
  lettersContainer.innerHTML = "";
};

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase(); // converti in maiuscolo per compatibilità

  if (italianLetters.includes(key)) {
    const buttons = document.querySelectorAll(".letter");
    buttons.forEach(btn => {
      if (btn.textContent === key && !btn.disabled) {
        btn.click(); // simula il click
      }
    });
  }
});
