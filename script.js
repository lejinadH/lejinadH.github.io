// === Select DOM elements ===
const startContainer = document.querySelector(".container.start");
const questionContainer = document.querySelector(".container.questions");
const correctContainer = document.querySelector(".container.correct");
const wrongContainer = document.querySelector(".container.wrong");
const endContainer = document.querySelector(".container.end");

const startBtn = document.querySelector(".start-btn");
const question_field = document.querySelector(".main-question");
const answer_buttons = document.querySelectorAll(".answer");
const awardField = document.querySelector(".award");

let currentIndex = 0;
let shuffledQuestions = [];

// === Question class (yours, with shuffle inside display) ===
class Question {
    constructor(question, answer_1, answer_2, correct, answer_4) {
        this.question = question;
        this.correct = correct;
        this.answers = [
            answer_1,
            answer_2,
            this.correct,
            answer_4
        ];
    }

    display() {
        question_field.innerHTML = this.question;
        // shuffle answers for randomness
        let shuffled = this.answers.sort(() => Math.random() - 0.5);
        for (let i = 0; i < shuffled.length; i++) {
            answer_buttons[i].innerHTML = shuffled[i];
            answer_buttons[i].dataset.correct = (shuffled[i] === this.correct);
        }
    }
}

// === Your questions ===
let current_questions = [
    new Question("Koji je glavni grad Bosne i Hercegovine?", "Zagreb", "Beograd", "Sarajevo", "Mostar"),
    new Question("Koliko ima kontinenata na svijetu?", "5", "6", "7", "8"),
    new Question("Koja životinja je poznata kao 'kralj džungle'?", "Tigar", "Slon", "Lav", "Leopard"),
    new Question("Koja planeta je najbliža Suncu?", "Venera", "Mars", "Merkur", "Jupiter"),
    new Question("Koja je hemijska oznaka za vodu?", "O2", "CO2", "H2O", "HO2"),
    new Question("Ko je napisao 'Na Drini ćuprija'?", "Mesa Selimović", "Branko Ćopić", "Ivo Andrić", "Njegoš"),
    new Question("Koji je najveći okean na svijetu?", "Atlantski", "Indijski", "Tihi", "Arktički"),
    new Question("Koji je najviši planinski vrh na svijetu?", "Kilimandžaro", "Mont Blanc", "Mount Everest", "K2"),
    new Question("Koja država je izmislila papir?", "Egipat", "Grčka", "Kina", "Indija"),
    new Question("Koji sport se igra na Wimbledonu?", "Nogomet", "Košarka", "Tenis", "Golf"),
    new Question("Koja rijeka prolazi kroz Egipat?", "Amazon", "Dunav", "Nil", "Eufrat"),
    new Question("Koliko iznosi kvadratni korijen od 81?", "7", "8", "9", "10"),
    new Question("Koji jezik ima najviše govornika na svijetu?", "Engleski", "Španski", "Kineski (mandarinski)", "Arapski"),
    new Question("Koji je glavni grad Japana?", "Sarajevo", "Pariz", "Tokio", "Berlin"),
    new Question("Koja je formula za površinu kruga?", "a²", "2πr", "πr²", "πd"),
    new Question("Koji je najbrži kopneni sisar?", "Konj", "Antilopa", "Gepard", "Lav"),
    new Question("Koji slavni naučnik je formulirao teoriju relativnosti?", "Nikola Tesla", "Isaac Newton", "Albert Einstein", "Galileo Galilei"),
    new Question("Koji je hemijski element sa simbolom 'Au'?", "Srebro", "Aluminij", "Zlato", "Bakar"),
    new Question("Koliko konj ima 4 noge?", "3", "4", "Cijeli život", "5"),
];

// === Utility to hide all containers ===
function hideAll() {
    [startContainer, questionContainer, correctContainer, wrongContainer, endContainer]
        .forEach(c => c.style.display = "none");
}

// === Start the game ===
startBtn.addEventListener("click", () => {
    shuffledQuestions = [...current_questions].sort(() => Math.random() - 0.5);
    currentIndex = 0;
    showQuestion();
});

// === Show a question ===
function showQuestion() {
    hideAll();
    questionContainer.style.display = "block";
    shuffledQuestions[currentIndex].display();
}

// === Handle answer clicks ===
answer_buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const isCorrect = btn.dataset.correct === "true";
        if (isCorrect) {
            showCorrect();
        } else {
            showWrong();
        }
    });
});

function showCorrect() {
    hideAll();
    correctContainer.style.display = "block";
    awardField.innerHTML = `Dobili ste ${ (currentIndex+1) * 50 }$`;

    // Nastavi → sljedeće pitanje
    correctContainer.querySelectorAll(".choice-btn")[0].onclick = () => {
        currentIndex++;
        if (currentIndex < shuffledQuestions.length) {
            showQuestion();
        } else {
            showEnd();
        }
    };
    // Odustani → kraj igre
    correctContainer.querySelectorAll(".choice-btn")[1].onclick = showEnd;
}

function showWrong() {
    hideAll();
    wrongContainer.style.display = "block";
    wrongContainer.querySelector(".meni_btn").onclick = () => {
        hideAll();
        startContainer.style.display = "block";
    };
}

function showEnd() {
    hideAll();
    endContainer.style.display = "block";
    endContainer.querySelector(".meni_btn").onclick = () => {
        hideAll();
        startContainer.style.display = "block";
    };
}

// === Init ===
hideAll();
startContainer.style.display = "block";
