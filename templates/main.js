const MODIFIER_TAG = "{modifier}";
const NAME_TAG = "{name}";
const ICON_TAG = "{icon}";
const MAJOR_PREFIX = "Maj ";
const MINOR_PREFIX = "Min ";
const RIGHT_NAME = "direita";
const LEFT_NAME = "esquerda";
const RIGHT_ICON = "🫱";
const LEFT_ICON = "🫲";
const SETTINGS_KEY = "random-harmony-base-options";

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

// Default base options
const defaultBaseOptions = [
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

// Settings management functions
function loadSettings() {
    try {
        const savedOptions = localStorage.getItem(SETTINGS_KEY);
        if (savedOptions) {
            const parsed = JSON.parse(savedOptions);
            // If parsed options are empty or invalid, return defaults
            if (!Array.isArray(parsed) || parsed.length === 0) {
                return defaultBaseOptions;
            }
            return parsed;
        }
    } catch (e) {
        console.error("Error loading settings:", e);
    }
    return defaultBaseOptions;
}

function saveSettings() {
    const textarea = $("#baseOptionsInput");
    const options = textarea.val().split('\n').filter(line => line.trim() !== '');
    
    if (options.length === 0) {
        alert("Please enter at least one option");
        return;
    }

    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(options));
        baseOptions = options;
        initializeOptions();
        shuffle();
        $("#settingsModal").modal('hide');
    } catch (e) {
        console.error("Error saving settings:", e);
        alert("Error saving settings. Please try again.");
    }
}

function clearSettings() {
    try {
        localStorage.removeItem(SETTINGS_KEY);
        baseOptions = defaultBaseOptions;
        initializeOptions();
        shuffle();
        $("#baseOptionsInput").val(defaultBaseOptions.join('\n'));
    } catch (e) {
        console.error("Error clearing settings:", e);
        alert("Error clearing settings. Please try again.");
    }
}

function initializeOptions() {
    const learnOptions = baseOptions.slice(0, 6);
    
    optionsMajorRight.length = 0;
    optionsMajorLeft.length = 0;
    optionsMinorRight.length = 0;
    optionsMinorLeft.length = 0;
    
    optionsMajorRight.push(...mapStrings(baseOptions, MAJOR_PREFIX, RIGHT_NAME, RIGHT_ICON));
    optionsMajorLeft.push(...mapStrings(baseOptions, MAJOR_PREFIX, LEFT_NAME, LEFT_ICON));
    optionsMinorRight.push(...mapStrings(learnOptions, MINOR_PREFIX, RIGHT_NAME, RIGHT_ICON));
    optionsMinorLeft.push(...mapStrings(learnOptions, MINOR_PREFIX, LEFT_NAME, LEFT_ICON));
    
    options.length = 0;
    options.push(...[...optionsMajorRight, ...optionsMinorRight], ...[...optionsMajorLeft, ...optionsMinorLeft]);
}

let baseOptions = loadSettings();
const optionsMajorRight = [];
const optionsMajorLeft = [];
const optionsMinorRight = [];
const optionsMinorLeft = [];
const options = [];

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
    
    // Create temporary arrays for shuffling
    const optionsRight = [...optionsMajorRight, ...optionsMinorRight];
    const optionsLeft = [...optionsMajorLeft, ...optionsMinorLeft];
    
    shuffleArray(optionsRight);
    shuffleArray(optionsLeft);
    
    options.length = 0;
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

// Add this function to generate random gradients
function setRandomGradient() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + Math.floor(Math.random() * 60) + 150) % 360; // Complementary-ish color
    
    const gradient = `linear-gradient(
        45deg,
        hsl(${hue1}, 75%, 25%) 0%,
        hsl(${hue1}, 75%, 35%) 50%,
        hsl(${hue2}, 75%, 25%) 100%
    )`;
    
    document.body.style.background = gradient;
}

$(document).ready(function() {
    initializeOptions();
    shuffle();
    
    // Initialize settings modal with current options
    const currentOptions = baseOptions || defaultBaseOptions;
    $("#baseOptionsInput").val(currentOptions.join('\n'));
    
    // Update textarea content whenever modal is opened
    $("#settingsModal").on('show.bs.modal', function() {
        const currentOptions = baseOptions || defaultBaseOptions;
        $("#baseOptionsInput").val(currentOptions.join('\n'));
    });
    
    // Add this line with your other initializations
    setRandomGradient();
});
