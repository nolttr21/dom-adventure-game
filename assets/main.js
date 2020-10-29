/**
 * DOM Adventure Game
 * //Players health starts at five
let health = 5;
//Used this string to divide different messages
const divider = "--------------------";
//Used this string when user gave invalid input
const errorMessage = function(funcName) {
  console.log("\n" + divider);
  //Shows error message
  console.log("Please enter a valid answer");
  //Calls the function that called it
  return funcName();
}

//Shows this when player dies
const death = function(cause) {
  //Shows the cause of death
  console.log("\n" + cause);
  console.log("Do you want to try again?");
  //If the user answers yes, reset health and start again
  opt = prompt("yes\nno");
  if (opt === "yes") {
    health = 5;
    return start();
  } else if (opt === "no") {
    return;
  } else {
    return errorMessage(death);
  }
}

//This is the final scene
//You only get to this scene if you're health is 1
const finalScene = function(num) {
  console.log("You are very hungry.");
  console.log("The cost of food is one gold bar.");
  console.log("Will you:");
  //If you choose "buy food" and you have at least one gold bar, you win
  const opt = prompt("buy food\ndo nothing");
  console.log(divider)
  if (opt === "buy food") {
    if (num > 0) {
      console.log("You have enough gold to buy food.");
      console.log("\nGood job, you won!");
      return;
    } else {
      console.log("You don't have enough to pay for food.");
    }
  }
  return death("You died of starvation.");
}

//Here they may take gold, but not too much
const goldRoom = function() {
  //Shows what the scene is like
  console.log("\nYou enter a room filled with gold bars!");
  let num = (prompt("How many will you take? (Hint: don't take more than you can handle."));
  //Makes sure they entered a number
  if (isNaN(num)) {
    console.log(divider);
    console.log(`How many gold bars is ${num}?`)
    return goldRoom();
    //If they choose a number less than ten, check these statements
  } else if (num <= 10) {
    console.log(divider);
    //If There health is greater than one, they win
    if (health > 1) {
      console.log("Good job, you won!");
      //If their health is one, go to finalScene
    } else {
      return finalScene(num);
    }
  } else if (num > 10) {
    console.log(divider);
  //If they take more than 10, they will be taken back to scene one
    console.log("You took too many and couldn't escape.");
    console.log("\nYou got arrested!");
    return start();
  }
}

//In this room, you must choose the correct vehicle to cross the landmines
const landMineRoom = function() {
  //Shows user's health
  console.log("\nhealth:" + health);
  //Shows what the scene is like
  console.log("This room is full of land mines");
  console.log("You can use a helicopter or hovercraft to cross");
  console.log("\nDo you use:");
  const choice = prompt("helicopter\nhovercraft");
  //If they choose the helicopter, they crash and die
  if (choice === "helicopter") {
    return death("You tried to fly a helicopter indoors and crashed!");
    //If they choose the hovercraft, they proceed to goldRoom
  } else if (choice === "hovercraft") {
    console.log(divider);
    console.log("You successfully hover over the land mines");
    return goldRoom();
  } else {
    return errorMessage(landMineRoom);
  }
}

//In this room, you must answer the question correctly
const zachRoom = function() {
  //Shows user's health
  console.log("\nhealth:" + health);
  //Shows what the scene is like
  console.log("A wild Zach Fedor appears!");
  const num = prompt(console.log(`He says: "Hello ${name}. Convert the number 7 to binary."`));
  //If they answer correctly, proceed to goldRoom
  if (num === "0111" || num === "111") {
    console.log(divider);
    console.log(`"Correct!"`);
    return goldRoom();
    //If they answer incorrectly, subtract one from health
  } else {
    health--;
    //If health is less than one, call death function
    if (health <= 0) {
      return death("You died of getting a bad grade!");
    } else {
      //If health is more than zero, go to goldRoom
      console.log(divider);
      console.log("You got an F on the quiz");
      console.log("damage: 1");
      return goldRoom();
    }
  }

}

//In this room, you must pick the right door
const lionRoom = function() {
  //Show user's health
  console.log("\nhealth:" + health);
  //Show what the scene is like
  console.log("There are two doors:");
  console.log("Behind the first one is a lion that hasn't eaten in months");
  console.log("Behind the second one is a venomous snake");
  console.log("\nDo you pick:")
  const choice = prompt("door 1\ndoor 2");
  //If they choose the first door, go to zachRoom
  if (choice === "door 1" || choice === "1") {
    console.log(divider);
    console.log("You step over the skeleton of the starved lion and proceed through the next door");
    return zachRoom();
    //If they choose the second door, subtract 3 from health
  } else if (choice === "door 2" || choice === "2") {
    health -= 3;
    //If health is less than one, call death function
    if(health <= 0) {
      return death("You were bitten by a venomous snake!");
      //If health is more than zero, go to landMineRoom
    } else {
      console.log(divider);
      console.log("You were bitten, but you survived!");
      console.log("damage: 3");
      console.log("You escape the room");
      return landMineRoom();
    }
  } else {
    return errorMessage(lionRoom);
  }
}

//In this room, you must guess the code
const guessRoom = function() {
  //Show user's health
  console.log("\nhealth: " + health);
  //Show what the scene is like
  console.log("There is room with a door that is locked, and requires a code");
  console.log(`\nIt says: "Hello, ${name}"`);
  //Create a random number from 1 to 10
  const rand = Math.floor(Math.random() * Math.floor(9) + 1);
  //Give the user 3 tries to guess the number
  for (tries = 3; tries > 0; tries--) {
    const guess = Number(prompt(`"Guess a number between 1 and ten. You have ${tries} tries"`)); 
    //If they guess correctly, go to goldRoom
    if (guess === rand) {
      console.log(divider)
      console.log("Congratulations, you've guessed correctly!");
      return goldRoom();
    }
  }
  //If they run out of guesses, subtract one from health
  console.log(divider)
  console.log(`\n"You're out of guesses."`)
  console.log("A trap door opens up from beneath you!");
  health -= 1;
  //If health is less than one, call death function
  if (health <= 0) {
    return death("You fell through a trap door and broke your face!");
    //If health is more than zero, go to lionRoom
  } else if (health > 0) {
    console.log("damage: 1");
    return lionRoom();
  }
};

//In this room, you must get past the zombies to get through the door
const zombieRoom = function() {
  console.log(divider);
  //Show user health
  console.log("\nhealth: " + health);
  //Show what the scene is like
  console.log("There is another door in this room guarded by zombies");
  console.log("\nDo you:");
  const choice = prompt("lead them away from the door\nfight them");
  //If they choose to fight them, subtract three from health
  if (choice === "fight them") {
    health -= 3;
    //If health is less than one, call death function
    if (health <= 0) {
      return death("\nThe zombies eat your brains!");
      //If health is more than zero, go to guessRoom
    } else {
      console.log(divider)
      console.log("\nYou were injured, but you fought them off!");
      console.log("damage: 3");
      return guessRoom();
    }
  } else if (choice === "lead them away from the door" || choice === "lead them away") {
    console.log(divider)
      return guessRoom();
  } else {
    return errorMessage(zombieRoom);
  }
};

//Wrong door, you're dead
const octopusRoom = function() {
  console.log(divider);
  //Shows what the scene is like
  console.log("You open the door");
  console.log("You see giant tenticles reaching out to grab you!");
  console.log("The giant octopus pulls you into the toxic liquid");
  //Call death function
  return death("You were eaten by a giant octopus");
}

//This is where the game starts. You  must pick the right door
const start = function() {
  //Show user's health
  console.log("\nhealth: " + health);
  //Show what the scene is like
  console.log("You wake up in a dimly lit room");
  console.log("There are two doors");
  console.log("\nDo you pick:");
  const choice = prompt("door 1\ndoor 2");
  //If they pick door two, go to octopusRoom
  if (choice === "door 2" || choice === "2") {
    return octopusRoom();
  //If they pick door one, go to zombieRoom
  } else if (choice === "door 1" || choice === "1") {
      return zombieRoom();
  } else {
    return errorMessage(start);
  }
};

//Create name variable with user's name
const name = prompt(String("Enter nickname"));
//Call start function
start();
 */

/*document.querySelector('#game').textContent = 'DOM Adventure Game';*/

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

const nicknameTextbox = startingPage.querySelector("input");
const nicknameButton = startingPage.querySelector("button");
nicknameButton.addEventListener("click", event => {
  document.querySelector(".name").textContent = nicknameTextbox.value;
  startingPage.style.display = "none";
  startingRoom.style.display = "block";
});

const zombieButton = startingRoom.querySelector("button:first-of-type");
zombieButton.addEventListener("click", event => {
  startingRoom.style.display = "none";
  zombieRoom.style.display = "block";
});
const octopusButton = startingRoom.querySelector("button:last-of-type");
octopusButton.addEventListener("click", event=> {
  startingRoom.style.display = "none";
  octopusRoom.style.display = "block";
})

const leadButton = zombieRoom.querySelector("button:first-of-type");
leadButton.addEventListener("click", event => {
  zombieRoom.style.display = "none";
  guessRoom.style.display = "block";
});
const fightButton = zombieRoom.querySelector("button:last-of-type");
fightButton.addEventListener("click", event => {
  zombieRoom.style.display = "none";
  guessRoom.style.display = "block";
})

const guessTextBox = guessRoom.querySelector("input");
let tries = 3;
let rand = Math.floor(Math.random() * Math.floor(9) + 1);
console.log(rand);
guessTextBox.addEventListener("keypress", event => {
  if(event.key == "Enter") {
    if (guessTextBox.value == rand) {
      guessRoom.style.display = "none";
      lionRoom.style.display = "block";
    } else if (tries > 1) {
      tries--;
      document.querySelector(".tries").textContent = tries;
    } else {
      guessRoom.style.display = "none";
    }
    guessTextBox.value = "";
  }
});

const lionButton = lionRoom.querySelector("button:first-of-type");
lionButton.addEventListener("click", event => {
  lionRoom.style.display = "none";
  zachRoom.style.display = "block";
});
const snakeButton = lionRoom.querySelector("button:last-of-type");
snakeButton.addEventListener("click", event => {
  lionRoom.style.display = "none";
  zachRoom.style.display = "block";
})

const zachTextBox = zachRoom.querySelector("input");
zachTextBox.addEventListener("keypress", event => {
  if (event.key == "Enter") {
    const guess = zachTextBox.value.padStart(4, 0);
    if (guess === "0111") {
      zachRoom.style.display = "none";
      goldRoom.style.display = "block";
    } else {
      zachRoom.style.display = "none";
      goldRoom.style.display = "block";
    }
    zachTextBox.value = "";
  }
});

const goldTextBox = goldRoom.querySelector("input");
goldTextBox.addEventListener("keypress", event => {
  if (event.key == "Enter") {
    if (goldTextBox.value <= 15) {
      goldRoom.style.display = "none";
      finalScene.style.display = "block";
    } else {
      goldRoom.style.display = "none";
      startingRoom.style.display = "block";
    }
    goldTextBox.value = "";
  }
});