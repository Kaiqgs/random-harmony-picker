const MODIFIER_TAG = "{modifier}";
const NAME_TAG = "{name}";
const ICON_TAG = "{icon}";
const MAJOR_PREFIX = "Maj ";
const MINOR_PREFIX = "Min ";
const RIGHT_NAME = "right";
const LEFT_NAME = "left";
const RIGHT_ICON = "🫱";
const LEFT_ICON = "🫲";
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function mapStrings(baseOptions, modifier, name, icon) {
    const output = [];
    for (let option of baseOptions) {
        option = option.replace(MODIFIER_TAG, modifier);
        option = option.replace(NAME_TAG, name);
        option = option.replace(ICON_TAG, icon);
        output.push(option);
    }
    return output;
}

const baseOptions = [
    `${MODIFIER_TAG}<b>C </b> <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>G </b> <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>D </b> <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>A </b> <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>E </b> <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>B </b> <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>F </b> <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>Bb</b>  <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>Eb</b>  <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>Ab</b>  <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>F#</b>  <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
    `${MODIFIER_TAG}<b>C#</b>  <u>${NAME_TAG}</u> <p class="display-6">${ICON_TAG}</p>`,
];
const learnOptions = baseOptions.slice(0, 6);

const optionsMajorRight = mapStrings(baseOptions, MAJOR_PREFIX, RIGHT_NAME, RIGHT_ICON);
const optionsMajorLeft = mapStrings(baseOptions, MAJOR_PREFIX, LEFT_NAME, LEFT_ICON);
const optionsMinorRight = mapStrings(learnOptions, MINOR_PREFIX, RIGHT_NAME, RIGHT_ICON);
const optionsMinorLeft = mapStrings(learnOptions, MINOR_PREFIX, LEFT_NAME, LEFT_ICON);

const optionsRight = [...optionsMajorRight, ...optionsMinorRight];
const optionsLeft = [...optionsMajorLeft, ...optionsMinorLeft];

const options = [...optionsRight, optionsLeft];

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
    shuffleArray(optionsRight);
    shuffleArray(optionsLeft);
    for (let i = 0; i < optionsLeft.length + optionsRight.length; i++) {
        const index = Math.floor(i / 2);
        if (i % 2 == 0) {
            options[i] = optionsRight[index];
            continue;
        }
        options[i] = optionsLeft[index];
    }
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
