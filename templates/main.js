function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const options = [
    "* Bb 🫱",
    "* C 🫱",
    "* A 🫱",
    "* Bb 🫲",
    "* F# 🫱",
    "* F 🫲",
    "* F 🫱",
    "* B 🫱",
    "* C# 🫱",
    "* G 🫱",
    "* A 🫲",
    "* C 🫲",
    "* F# 🫲",
    "* E 🫱",
    "* Ab 🫲",
    "* D 🫱",
    "* Eb 🫱",
    "* B 🫲",
    "* D 🫲",
    "* Ab 🫱",
    "* Eb 🫲",
    "* C# 🫲",
    "* G 🫲",
    "* E 🫲",
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
