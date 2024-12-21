// Store game data
let gameData = {
  localTeam: {
    players: [],
    score: 0,
    fouls: 0,
    },
    challengerTeam: {
    players: [],
    score: 0,
    fouls: 0,
    },
    timePlayed: 0, // Initialize timePlayed (in seconds)
    events: [{
        player: "Player1",
        type: "Uneventful",
    }] // Store score and foul events
};

let allGamesData = [];

let localScoreH2 = document.getElementById("local-score");
let challengerScoreH2 = document.getElementById("challenger-score");
let localFoulH2 = document.getElementById("local-foul");
let challengerFoulH2 = document.getElementById("challenger-foul");

let gameTimer = 0;
let gamePlayedTime;

let overTime = 0;


// Initial time in seconds (10 minutes = 600 seconds)
let timeRemaining = 600;
let timerInterval;

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Variables stuff ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//||||||||||||||||||||||||||||||||--------------|||||||||||||||||||||||||||||||
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Timer stuff  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv


// Update the timer display
function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60); // Calculate minutes
    const seconds = timeRemaining % 60; // Calculate seconds
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const minutes2 = Math.floor(gameTimer / 60); // Calculate minutes
    const seconds2 = gameTimer % 60; // Calculate seconds
    gamePlayedTime = `${minutes2.toString().padStart(2, '0')}:${seconds2.toString().padStart(2,'0')}`;
    document.getElementById('timer').textContent = formattedTime;
}

    // Start the countdown
function startTimer() {
    if (timerInterval) {
    return; // Prevent starting multiple intervals at the same time
}
      
timerInterval = setInterval(() => {
    if (timeRemaining <= 0) {
        if (localScoreH2.textContent === challengerScoreH2.textContent && overTime === 0){
            timeRemaining = 300;
            overTime = 1;
        } else {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            alert('Time is up!');
        }
    } else {
        timeRemaining--; // Decrease time by 1 second
        gameTimer++;
        updateTimer();
    }
    }, 1000); // Update every second
}

// Stop the countdown
function stopTimer() {
    clearInterval(timerInterval); // Clear the interval and stop the timer
    timerInterval = null; // Reset the interval variable
    //alert('Timer stopped');
}
// Restart the timer back to 10 minutes
function restartTimer() {
    save();
    clearInterval(timerInterval); // Clear the current interval if running
    timerInterval = null; // Reset interval variable
    timeRemaining = 600; // Reset time to 10 minutes
    updateTimer(); // Update display to 10:00
    //alert('Timer restarted');
}

// Initialize timer
updateTimer();
    
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Timer stuff ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//||||||||||||||||||||||||||||||||-------------|||||||||||||||||||||||||||||||
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Score stuff vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv



function increment(team, type) {
    let playerName = "";
    if (team === 0) {
        // Get player who scored or committed a foul
        if (type === 0) {
            playerName = document.getElementById("local-score-player").value;           
            if (playerName) {
                gameData.localTeam.score += 1;        
                gameData.events.push({
                    player: playerName,
                    type: "Gol",
                    team: team === 0 ? "Local" : "challenger"
                });
            }
        } else if (type === 1) {
            playerName = document.getElementById("local-foul-player").value;
            if (playerName) {
                gameData.localTeam.fouls += 1;        
                gameData.events.push({
                    player: playerName,
                    type: "Falta",
                    team: team === 0 ? "Local" : "challenger"
                 });
            }
        }
    } else if (team === 1) {
        // Get player who scored or committed a foul
        if (type === 0) {
            playerName = document.getElementById("challenger-score-player").value;
            if (playerName) {
                gameData.challengerTeam.score += 1;        
                gameData.events.push({
                    player: playerName,
                    type: "Gol",
                    team: team === 0 ? "Local" : "challenger"
                });
            }
        } else if (type === 1) {
            playerName = document.getElementById("challenger-foul-player").value;
            if (playerName) {
                gameData.challengerTeam.fouls += 1;        
                gameData.events.push({
                    player: playerName,
                    type: "Falta",
                    team: team === 0 ? "Local" : "challenger"
                });
            }
        }
    }

    // Update the displayed scores and fouls
    document.getElementById("local-score").textContent = gameData.localTeam.score;
    document.getElementById("challenger-score").textContent = gameData.challengerTeam.score;
    document.getElementById("local-foul").textContent = gameData.localTeam.fouls;
    document.getElementById("challenger-foul").textContent = gameData.challengerTeam.fouls;
    

    // Clear the input fields
    document.getElementById("local-score-player").value = "";
    document.getElementById("local-foul-player").value = "";
    document.getElementById("challenger-score-player").value = "";
    document.getElementById("challenger-foul-player").value = "";
}

function save() {
    // Parse the scores and fouls
    gameData.localTeam.score = parseInt(localScoreH2.textContent);
    gameData.challengerTeam.score = parseInt(challengerScoreH2.textContent);
    gameData.localTeam.fouls = parseInt(localFoulH2.textContent);
    gameData.challengerTeam.fouls = parseInt(challengerFoulH2.textContent);
    
    
    // Save the time played from the timer
    gameData.timePlayed = gamePlayedTime


    // Get the player names for each team
    let localPlayers = [];
    let challengerPlayers = [];

    // Get all input fields for local players and push their values into localPlayers array
    let localPlayerInputs = document.querySelectorAll('.local-player');
    localPlayerInputs.forEach(input => {
        if (input.value.trim() !== '') {
            localPlayers.push(input.value.trim());
        }
    });

    // Get all input fields for challenger players and push their values into challengerPlayers array
    let challengerPlayerInputs = document.querySelectorAll('.challenger-player');
    challengerPlayerInputs.forEach(input => {
        if (input.value.trim() !== '') {
            challengerPlayers.push(input.value.trim());
        }
    });

    // Save players to the gameData object
    gameData.localTeam.players = localPlayers;
    gameData.challengerTeam.players = challengerPlayers;

    overTime = 0;
    

    // Log the game data to the console
    allGamesData.push(gameData);
    
    // Clear gameData
    gameData = {
        localTeam: {
            players: [],
            score: 0,
            fouls: 0,
            },
            challengerTeam: {
            players: [],
            score: 0,
            fouls: 0,
            },
            timePlayed: 0, // Initialize timePlayed (in seconds)
            events: [{
                player: "Player1",
                type: "Uneventful",
            }] // Store score and foul events
        };
        
    // Reset the scores and fouls to 0
    localFoulH2.textContent = 0;
    localScoreH2.textContent = 0;
    challengerFoulH2.textContent = 0;
    challengerScoreH2.textContent = 0;

}

function downloadData(){
    const jsonString = JSON.stringify(allGamesData, null, 2); // Pretty formatting with 2 spaces
    // Create a Blob with the JSON data and set its MIME type to application/json
    const blob = new Blob([jsonString], { type: 'application/json' });
    // Create a download link
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'allGamesData.json'; // The name of the downloaded file
    document.body.appendChild(a); // Append the link to the body
    // Programmatically click the link to trigger the download
    a.click();
    // Remove the link after triggering the download
    document.body.removeChild(a);
}


     
      
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Score stuff ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//||||||||||||||||||||||||||||||||-------------|||||||||||||||||||||||||||||||