const $ = (id) => {
return document.getElementById(id);
};


let clicks = 0;

let startTime = Date.now();

let loading = 0;



/* =========================================
POINTLESS BUTTONS
========================================= */


const messages = {

nothing:
"Nothing happened.",

click:
"You clicked the button. Congratulations.",

dont:
"You were specifically told not to do that.",

important:
"This button is not important.",

emergency:
"Emergency status: not particularly urgent.",

fix:
"Website has been successfully broken.",

improve:
"Error: improvement unavailable.",

worse:
"Congratulations. You have made the website even more pointless."

};


function updateClicks() {

clicks++;

$("clickCount").textContent =
clicks;


$("pointlessness").textContent =
Math.min(
100,
100 + Math.floor(clicks / 10)
) + "%";


$("productivity").textContent =
Math.max(
0,
3 - Math.floor(clicks / 20)
) + "%";


if (clicks >= 1) {

$("achFirst")
.classList
.add("unlocked");

}


if (clicks >= 25) {

$("achButtons")
.classList
.add("unlocked");

}

}



document
.querySelectorAll("[data-action]")
.forEach(button => {

button.addEventListener(
"click",
() => {

const action =
button.dataset.action;


updateClicks();


$("message")
.textContent =
messages[action];


if (action === "worse") {

document.body.style.filter =
"contrast(1.15) saturate(.7)";


$("footerStatus")
.textContent =
"System has become significantly more pointless.";

}

}
);

});



/* =========================================
CLOCK
========================================= */


function updateClock() {

$("clock")
.textContent =
new Date().toLocaleTimeString();

}


setInterval(
updateClock,
1000
);


updateClock();



/* =========================================
TIME WASTED
========================================= */


function updateWastedTime() {

const seconds =
Math.floor(
(Date.now() - startTime) / 1000
);


const minutes =
Math.floor(
seconds / 60
);


const remainingSeconds =
String(
seconds % 60
).padStart(2, "0");


$("timeWasted")
.textContent =
`${minutes}:${remainingSeconds}`;


if (seconds >= 30) {

$("achStill")
.classList
.add("unlocked");

}


if (seconds >= 600) {

$("achWhy")
.classList
.add("unlocked");

}

}


setInterval(
updateWastedTime,
1000
);



/* =========================================
DIAGNOSTICS
========================================= */


$("diagnosticButton")
.addEventListener(
"click",
async () => {

const rows =
[
...$("diagnostics")
.children
];


for (const row of rows) {

row.querySelector("span")
.textContent =
"CHECKING...";


await new Promise(
resolve =>
setTimeout(
resolve,
350
)
);


const name =
row.firstChild
.textContent
.trim();


let result =
"OK";


if (name === "BRAIN") {

result =
"WARNING";

}


if (name === "PURPOSE") {

result =
"NOT FOUND";

}


if (name === "WEBSITE") {

result =
"WHY";

}


row.querySelector("span")
.textContent =
result;

}


$("message")
.textContent =
"Diagnostic complete. Everything is fine. Probably.";


updateClicks();

}
);



/* =========================================
TERMINAL
========================================= */


function addTerminal(text) {

$("terminal")
.textContent +=
`> ${text}\n`;


$("terminal")
.scrollTop =
$("terminal")
.scrollHeight;

}


const terminalLines = [

"initializing pointless_system.exe",

"loading purpose...",

"purpose not found",

"searching for purpose...",

"still nothing",

"checking internet...",

"internet unfortunately active",

"calculating global impact...",

"0.000000%",

"giving up",

"welcome, user."

];


let terminalIndex = 0;


$("terminalButton")
.addEventListener(
"click",
() => {

addTerminal(
terminalLines[
terminalIndex %
terminalLines.length
]
);


terminalIndex++;


updateClicks();

}
);



/* =========================================
LOADING BAR
========================================= */


function updateLoading() {

if (loading >= 99) {

loading = 99;


$("loadingText")
.textContent =
"Loading extremely important information...";


$("loadingResult")
.textContent =
"Estimated completion time: 47 years.";

}


$("progressBar")
.style
.width =
loading + "%";


$("loadingPercent")
.textContent =
loading + "%";

}


setInterval(
() => {

if (loading < 99) {

if (
Math.random() < .45
) {

loading++;

}


updateLoading();

}

},
1000
);



$("finishLoading")
.addEventListener(
"click",
() => {

loading = 100;


$("progressBar")
.style
.width =
"100%";


$("loadingPercent")
.textContent =
"100%";


$("loadingText")
.textContent =
"Important information loaded.";


$("loadingResult")
.textContent =
"Result: There was no information.";


updateClicks();

}
);



/* =========================================
POINTLESS AI
========================================= */


const aiResponses = [

"I don't know.",

"No.",

"Probably.",

"I wasn't programmed for that.",

"Interesting.",

"Have you tried turning the website off and on again?",

"This is above my pay grade.",

"I can offer no assistance at this time.",

"The answer is 42. Probably.",

"Why are you asking me?"

];


$("chatButton")
.addEventListener(
"click",
sendAI
);


$("chatInput")
.addEventListener(
"keydown",
event => {

if (
event.key === "Enter"
) {

sendAI();

}

}
);


function sendAI() {

const input =
$("chatInput");


const text =
input.value.trim();


if (!text) {

return;

}


const user =
document.createElement("div");


user.className =
"user";


user.textContent =
"YOU: " + text;


const ai =
document.createElement("div");


ai.className =
"ai";


ai.textContent =
"AI: " +
aiResponses[
Math.floor(
Math.random() *
aiResponses.length
)
];


$("chat")
.append(
user,
ai
);


$("chat")
.scrollTop =
$("chat")
.scrollHeight;


input.value =
"";


updateClicks();

}



/* =========================================
FAKE LOGIN
========================================= */


$("loginForm")
.addEventListener(
"submit",
event => {

event.preventDefault();


$("loginMessage")
.textContent =
"Login successful. There was never an account.";


updateClicks();

}
);



/* =========================================
FAKE STORE
========================================= */


document
.querySelectorAll(".buy")
.forEach(button => {

button.addEventListener(
"click",
() => {

button.textContent =
"PURCHASED";


button.parentElement
.querySelector("p")
.textContent =
"You bought nothing.";


$("message")
.textContent =
"Thank you for your purchase of absolutely nothing.";


updateClicks();

}
);

});



/* =========================================
INTELLIGENCE TEST
========================================= */


document
.querySelectorAll(".intelligence")
.forEach(button => {

button.addEventListener(
"click",
() => {

$("intelligenceMessage")
.textContent =
"Interesting.";


updateClicks();

}
);

});



/* =========================================
SETTINGS
========================================= */


$("saveSettings")
.addEventListener(
"click",
() => {

document.body
.classList
.toggle(
"serious-mode",
$("seriousMode").checked
);


document.body
.classList
.toggle(
"extra-dark",
$("extraDark").checked
);


$("settingsMessage")
.textContent =
"Settings saved successfully. Nothing changed.";


updateClicks();

}
);



/* =========================================
RANDOM WARNINGS
========================================= */


const warnings = [

"Website functioning normally.",

"No problem detected. This is suspicious.",

"Your visit has been recorded for no reason.",

"Purpose levels are critically low.",

"Everything is probably fine.",

"The website knows you are here."

];


function showWarning() {

$("warningText")
.textContent =
warnings[
Math.floor(
Math.random() *
warnings.length
)
];


$("warning")
.classList
.remove("hidden");

}


$("closeWarning")
.addEventListener(
"click",
() => {

$("warning")
.classList
.add("hidden");


updateClicks();

}
);


setInterval(
() => {

if (
$("randomWarnings")
.checked
) {

showWarning();

}

},
12000
);



/* =========================================
RANDOM POINTLESS DATA
========================================= */


setInterval(
() => {

$("vibe")
.textContent =
Math.floor(
70 +
Math.random() * 31
) + "%";


$("brain")
.textContent =
Math.random() > .5
? "Detected"
: "Questionable";

},
2500
);



/* =========================================
SECRET TITLE
========================================= */


let titleClicks = 0;


$("mainTitle")
.addEventListener(
"click",
() => {

titleClicks++;


if (titleClicks === 7) {

$("message")
.textContent =
"YOU FOUND THE SECRET. There was no reason to find this.";


updateClicks();

}

}
);



/* =========================================
SECRET KEYBOARD SHORTCUT
========================================= */


document.addEventListener(
"keydown",
event => {

if (
event.ctrlKey &&
event.shiftKey &&
event.key.toLowerCase() === "p"
) {

$("message")
.textContent =
"SECRET MODE ACTIVATED: The website remains pointless.";


document.body
.classList
.toggle("extra-dark");


updateClicks();

}

}
);



/* =========================================
INITIAL TERMINAL
========================================= */


addTerminal(
"initializing pointless_system.exe"
);


addTerminal(
"purpose not found"
);


addTerminal(
"welcome, user."
);
