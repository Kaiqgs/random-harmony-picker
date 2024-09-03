function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const options = [
    "<b>Bb</b>  <u>right</u> 🫱",
    "<b>C </b> <u>right</u> 🫱",
    "<b>A </b> <u>right</u> 🫱",
    "<b>Bb</b>  <u>left</u> 🫲",
    "<b>F#</b>  <u>right</u> 🫱",
    "<b>F </b> <u>left</u> 🫲",
    "<b>F </b> <u>right</u> 🫱",
    "<b>B </b> <u>right</u> 🫱",
    "<b>C#</b>  <u>right</u> 🫱",
    "<b>G </b> <u>right</u> 🫱",
    "<b>A </b> <u>left</u> 🫲",
    "<b>C </b> <u>left</u> 🫲",
    "<b>F#</b>  <u>left</u> 🫲",
    "<b>E </b> <u>right</u> 🫱",
    "<b>Ab</b>  <u>left</u> 🫲",
    "<b>D </b> <u>right</u> 🫱",
    "<b>Eb</b>  <u>right</u> 🫱",
    "<b>B </b> <u>left</u> 🫲",
    "<b>D </b> <u>left</u> 🫲",
    "<b>Ab</b>  <u>right</u> 🫱",
    "<b>Eb</b>  <u>left</u> 🫲",
    "<b>C#</b>  <u>left</u> 🫲",
    "<b>G </b> <u>left</u> 🫲",
    "<b>E </b> <u>left</u> 🫲",
];

const settings = {
    index: 0,
};

function display() {
    const obj = $("#items-list");
    obj.html("");
    options.forEach((value) => {
        console.log("option");
        obj.append(`<li>${value}</li>`);
    });
    $("#selected-item").html(options[settings.index] || "empty");
}
function shuffle() {
    settings.index = 0;
    shuffleArray(options);
    display();
}

function next() {
    console.log("next");
    settings.index += 1;
    display();
}

$(document).ready(function() {
    // display();
    shuffle();
});
