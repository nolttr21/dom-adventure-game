//Create a variable for each room
const game = document.querySelector("#game");
const startingPage = document.querySelector("#starting-page");
const startingRoom = document.querySelector("#starting-room");
const octopusRoom = document.querySelector("#octopus-room");
const zombieRoom = document.querySelector("#zombie-room");
const guessRoom = document.querySelector("#guess-room");
const lionRoom = document.querySelector("#lion-room");
const zachRoom = document.querySelector("#zach-room");
const landmineRoom = document.querySelector("#landmine-room");
const goldRoom = document.querySelector("#gold-room");
const finalScene = document.querySelector("#final-scene");
const victory = document.querySelector("#victory");
const death = document.querySelector("#death");
const dialog = document.querySelector("#dialog");

//This function runs in between rooms
const displayDialog = function (message, next) {
  //Show dialog
  var later = next;
  dialog.style.display = "block"
  const para = dialog.querySelector("p");
  const button = dialog.querySelector("button");
  //Display dialog on paragraph
  para.textContent = message;
  //Wait until the button is pressed
  button.addEventListener("click", event => {
    dialog.style.display = "none";
    goldRoom.style.display = "none";
    landmineRoom.style.display = "none";
    lionRoom.style.display = "none";
    //Run the function for the next room
    console.log(later);
    switch (later) {
      case "startingRoom":
        start();
        break;
      case "octopusRoom":
        displayOctopusRoom();
        break;
      case "zombieRoom":
        displayZombieRoom();
        break;
      case "guessRoom":
        displayGuessRoom();
        break;
      case "lionRoom":
        displayLionRoom();
        break;
      case "zachRoom":
        displayZachRoom();
        break;
      case "landmineRoom":
        displayLandmineRoom();
        break;
      case "goldRoom":
        displayGoldRoom();
        break;
      case "finalScene":
        displayFinalScene();
        break;
    }
  });
}

//Shows and updates health message
let healthMessage = document.querySelector("#health");
const showHealthMessage = function(health) {
  healthMessage.textContent = "health: " + health;
};

//Victory scene
victory.querySelector("button").addEventListener("click", event => {
  victory.style.display = "none";
  start();
});

//Shows this when player dies
const displayDeath = function(cause) {
  //Show user's health
  showHealthMessage(0);
  //Show scene
  death.style.display = "block";

  //Shows the cause of death
  death.querySelector("p").textContent = cause;

  //Button to try again
  const tryAgain = death.querySelector("button");
  tryAgain.addEventListener("click", event => {
    death.style.display = "none";
    start();
  });
}

//This is the final scene
//You only get to this scene if you're health is 1
const displayFinalScene = function(num) {
  //Show user's health
  showHealthMessage(health);
  //Show scene
  finalScene.style.display = "block";

  //If you choose "buy food" and you have at least one gold bar, you win
  const buyFood = finalScene.querySelector("button:first-of-type");
  buyFood.addEventListener("click", event => {
    finalScene.style.display = "none";
    victory.style.display = "block";
  });
  const keepGoing = finalScene.querySelector("button:last-of-type");
  keepGoing.addEventListener("click", event => {
    finalScene.style.display = "none";
    showHealthMessage(0);
    displayDeath("You don't have enough to pay for food. You died of starvation.");
  });
}

//Here they may take gold, but not too much
const displayGoldRoom = function() {
  //Show user's health
  showHealthMessage(health);
  //Shows scene
  goldRoom.style.display = "block";
  const goldTextBox = goldRoom.querySelector("input");
  goldTextBox.addEventListener("keypress", event => {
    if (event.key == "Enter") {
      if (goldTextBox.value <= 15) {
        goldRoom.style.display = "none";
        //If their health is greater than one, they win
        if (health > 1) {
          victory.style.display = "block"
          //If their health is one, go to finalScene
        } else {
          finalScene.style.display = "block";
        }
        //If they take more than 10, they will be taken back to scene one
      } else {
        goldRoom.style.display = "none";
        displayDialog("You got arrested!", "startingRoom");
      }
      goldTextBox.value = "";
    }
  });
}

//In this room, you must choose the correct vehicle to cross the landmines
const displayLandmineRoom = function() {
  //Shows user's health
  showHealthMessage(health);
  //Shows scene
  landmineRoom.style.display = "block";

  //If they choose the helicopter, they crash and die
  const helicopterButton = landmineRoom.querySelector("button:first-of-type");
  helicopterButton.addEventListener("click", event => {
    landmineRoom.style.display = "none";
    showHealthMessage(0);
    displayDeath("You tried to fly a helicopter indoors and crashed!");
  });

  //If they choose the hovercraft, they proceed to goldRoom
  const hovercraftButton = landmineRoom.querySelector("button:last-of-type");
  hovercraftButton.addEventListener("click", event => {
    landmineRoom.style.display = "none";
    displayDialog("You successfully hover over the land mines.", "goldRoom");
  });
}

//In this room, you must answer the question correctly
const displayZachRoom = function() {
  //Shows user's health
  showHealthMessage(health);
  //Show scene
  zachRoom.style.display = "block";
  const zachTextBox = zachRoom.querySelector("input");
  zachTextBox.addEventListener("keypress", event => {
    if (event.key == "Enter") {
      const guess = zachTextBox.value.padStart(4, 0);
      //If they answer correctly, proceed to goldRoom
      if (guess === "0111") {
        zachRoom.style.display = "none";
        displayDialog("Correct!", "goldRoom");
      //If they answer incorrectly, subtract one from health
      } else {
        health--;
        if (health > 0) {
          showHealthMessage(health);
          zachRoom.style.display = "none";
          displayDialog("You got an F on the quiz.", "goldRoom");
        } else {
          showHealthMessage(0);
          displayDeath("You died of getting a bad grade!");
        }
      }
      zachTextBox.value = "";
    }
  });
}

//In this room, you must pick the right door
const displayLionRoom = function() {
  //Show user's health
  showHealthMessage(health);
  //Show the scene
  lionRoom.style.display = "block";
  //If they choose the first door, go to zachRoom
  const lionButton = lionRoom.querySelector("button:first-of-type");
  lionButton.addEventListener("click", event => {
    lionRoom.style.display = "none";
    displayDialog("You step over the skeleton of the starved lion and proceed through the next door.", "zachRoom");
  });
  const snakeButton = lionRoom.querySelector("button:last-of-type");
  snakeButton.addEventListener("click", event => {
    health -= 3;
    //If health is more than zero, go to landMineRoom
    if (health > 0) {
      showHealthMessage(health);
      lionRoom.style.display = "none";
      displayDialog("You were bitten, but you survived! You escape the next door.", "landmineRoom");
      //If health is less than one, call death function
    } else {
      showHealthMessage(0);
      lionRoom.style.display = "none";
      displayDeath("You were bitten by a venomous snake!");
    }
  });
}

//In this room, you must guess the code
const displayGuessRoom = function() {
  //Show user's health
  showHealthMessage(health);
  //Show scene
  guessRoom.style.display = "block"
  //Create a random number from 1 to 10
  const rand = Math.floor(Math.random() * Math.floor(9) + 1);
  //Give 3 tries
  let tries = 3;
  //Cheating
  console.log(rand);

  document.querySelector(".tries").textContent = tries;

  const guessTextBox = guessRoom.querySelector("input");
  guessTextBox.addEventListener("keypress", event => {
    if(event.key == "Enter") {
      //If they guess correctly, go to goldRoom
      if (guessTextBox.value == rand) {
        guessRoom.style.display = "none";
        displayDialog("Congratulations, you've guessed correctly!", "goldRoom");
      } else if (tries > 1) {
        tries--;

        document.querySelector(".tries").textContent = tries;
      } else {
        //If they run out of guesses, subtract one from health
        health--;
        //If health is more than zero, go to lionRoom
        if (health > 0) {
          showHealthMessage(health);
          guessRoom.style.display = "none";
          displayDialog("A trap door opens up from beneath you!", "lionRoom");
          //If health is less than one, call death function
        } else {
          showHealthMessage(0);
          displayDeath("You fell through a trap door and broke your face!")
        }
      }
      guessTextBox.value = "";
    }
  });
};

//In this room, you must get past the zombies to get through the door
const displayZombieRoom = function() {
  //Show user health
  showHealthMessage(health);
  //Show the scene
  zombieRoom.style.display = "block";
  const fightButton = zombieRoom.querySelector("button:last-of-type");
  fightButton.addEventListener("click", event => {
    //If they choose to fight them, remove 3 health
    health -= 3;

    //If health is more than zero, go to guessRoom
    if (health > 0) {
      showHealthMessage(health);
      zombieRoom.style.display = "none";
      displayDialog("You were injured, but you fought them off!", "guessRoom");
    //If health is less than one, call death function
    } else {
      showHealthMessage(0);
      displayDeath("The zombies eat your brains!")
    }
  });

  const leadButton = zombieRoom.querySelector("button:first-of-type");
  leadButton.addEventListener("click", event => {
    zombieRoom.style.display = "none";
    displayGuessRoom();
  });
};

//Wrong door, you're dead
const displayOctopusRoom = function() {
  //Show the scene
  octopusRoom.style.display = "block";

  const continueButton = octopusRoom.querySelector("button");
  continueButton.addEventListener("click", event => {
    //Call death function
    showHealthMessage(0);
    octopusRoom.style.display = "none";
    displayDeath("You were eaten by a giant octopus");
  });
}

//This is where the game starts. You  must pick the right door
const start = function() {
  //Players health starts at five
  health = 5;
  //Show user's health
  showHealthMessage(health);
  //Show the room
  startingRoom.style.display = "block";

  //If they pick door two, go to octopusRoom
  const octopusButton = startingRoom.querySelector("button:last-of-type");
  octopusButton.addEventListener("click", event => {
    startingRoom.style.display = "none";
    displayOctopusRoom();
  });

  //If they pick door one, go to zombieRoom
  const zombieButton = startingRoom.querySelector("button:first-of-type");
  zombieButton.addEventListener("click", event => {
    startingRoom.style.display = "none";
    displayZombieRoom();
  });
};

const nicknameTextbox = startingPage.querySelector("input");
const nicknameButton = startingPage.querySelector("button");
nicknameButton.addEventListener("click", event => {
  document.querySelectorAll(".name").textContent = nicknameTextbox.value;
  healthMessage.style.display = "block";
  startingPage.style.display = "none";
  start();
});
