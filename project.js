// Define audio elements
var audioRight = new Audio('./images/right.mp3'); 
var audioWrong = new Audio('./images/wrong.mp3'); 

// Set volume for answer audio
audioWrong.volume = 0.3; // Adjust volume to 30%
audioRight.volume = 0.3; // Adjust volume to 30%

// Array of image URLs and options
var imageOptions = [
    { imageUrl: "./pokemon/img1.png", option: 'PIKACHU' },
    { imageUrl: "./pokemon/img2.png", option: 'SQUIRTLE' },
    { imageUrl: "./pokemon/img3.png", option: 'TOTODILE' },
    { imageUrl: "./pokemon/img4.png", option: 'BULBUSAUR' },
    { imageUrl: "./pokemon/img5.png", option: 'JIGGLYPUFF' },
    { imageUrl: "./pokemon/img6.png", option: 'EEVEE' },
    { imageUrl: "./pokemon/img7.png", option: 'DRAGONITE' },
    { imageUrl: "./pokemon/img8.png", option: 'DRAGONIAR' },
    { imageUrl: "./pokemon/img9.png", option: 'RATICATE' },
    { imageUrl: "./pokemon/img10.png", option: 'CHARIZARD' }
];

// Function to get a random image option
function getRandomImageOption() {
    var randomIndex = Math.floor(Math.random() * imageOptions.length);
    return imageOptions[randomIndex];
}

// Function to set a random image source to the img element and fill buttons
function setRandomImageAndOptions() {
    var img = document.getElementById("random-image");
    var randomImageOption = getRandomImageOption();
    img.src = randomImageOption.imageUrl;

    var option = randomImageOption.option;
    var options = [option];

    // Get 3 other random options
    while (options.length < 4) {
        var randomIndex = Math.floor(Math.random() * imageOptions.length);
        var randomOption = imageOptions[randomIndex].option;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    // Shuffle the options array
    options.sort(() => Math.random() - 0.5);

    // Assign options to buttons
    for (var i = 0; i < 4; i++) {
        var button = document.getElementById('button' + (i + 1));
        button.textContent = options[i];
        button.classList.remove('correct');
        button.style.borderColor = '';
        button.style.backgroundColor = ''; // Reset background color
        button.disabled = false; // Enable buttons
    }

    // Highlight the correct option
    var correctButtonIndex = options.indexOf(option) + 1;
    var correctButton = document.getElementById('button' + correctButtonIndex);
    correctButton.classList.add('correct');

    // Add event listeners to buttons
    for (var i = 0; i < 4; i++) {
        var button = document.getElementById('button' + (i + 1));
        button.addEventListener('click', function(event) {
            var clickedOption = event.target.textContent;
            var correctAnswer = document.querySelector('.correct').textContent;

            if (clickedOption === correctAnswer) {
                event.target.style.borderColor = 'green';
                event.target.style.backgroundColor = 'lightgreen';
                audioRight.play(); // Play 'right' audio
            } else {
                event.target.style.borderColor = 'red';
                event.target.style.backgroundColor = 'lightcoral';

                // Highlight correct button
                var correctButton = document.querySelector('.correct');
                correctButton.style.borderColor = 'green';
                correctButton.style.backgroundColor = 'lightgreen';
                audioWrong.play(); // Play 'wrong' audio
            }

            changeImageBrightness(); // Change image brightness
            // Disable all buttons
            var buttons = document.querySelectorAll('button');
            buttons.forEach(function(button) {
                button.disabled = true;
            });
            setTimeout(function() {
                location.reload();
            }, 3000); // Refresh page after 3 seconds
        });
    }
}

// Function to highlight the correct answer
function highlightCorrectAnswer() {
    var correctAnswer = document.querySelector('.correct').textContent;
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        if (button.textContent === correctAnswer) {
            button.style.borderColor = 'green';
            button.style.backgroundColor = 'lightgreen';
        }
    });
}

// Function to change the filter brightness of the image to 100%
function changeImageBrightness() {
    var img = document.getElementById("random-image");
    img.style.filter = "brightness(100%)";
}

// Call the function initially to set a random image and options when the page loads
setRandomImageAndOptions();
