/**
 * initialize the game, eg. set variables what they need to be ect...
 */
var lives = 5;
let correctDoor = Math.round(Math.random()*3) +1;//a randomly generated correct door
let gotCheckpoint = false;
console.log(correctDoor);//for testing

document.querySelector('#game').textContent = 'The game will begin in 5 seconds';


const finalRoom = function(){

  var describe = document.querySelector(".roomDescription");
  describe.textContent = "There was a bomb at the top of that path, which you ignited with your fire flower, blowing up the wall and revealing the final room. Congratulations! You've made it to the final room. The room contains 100 coins. You currently have 27 coins. How many coins will you collect? Keep in mind that not choosing the correct number will not kill you.";

  var form = document.createElement("form");
  var input = document.createElement("input");
  var submit = document.createElement("input");

  input.type = "number";
  input.value = "0";
  submit.type = "submit";


  form.appendChild(input);
  form.appendChild(submit);
  describe.appendChild(form);

  submit.addEventListener("click",() =>{

    if (input.value == 42)
    {
      describe.textContent = "nice, you chose correctly. Your total coin count is now 69 - style points achieved! There was a pipe at the end of the room that takes you to the ax. Congratulations, you beat the level. Nice work!!!";
    }
    else {
      describe.textContent = "That wasn't the correct number of coins but it's fine, you just missed out on some style points. There was a pipe at the end of the room that takes you to the ax. Congratulations, you beat the level. Nice work!!!";
    }
    describe.removeChild(form);

    event.preventDefault();
  });

}

//finalRoom();


const powerupChoice = function(){
  var describe = document.querySelector(".roomDescription");
  describe.textContent = "The next room leaves you with(once again) another choice. To progress through the room you must travel upward, however you must choose to take, or not to take, a powerup with you. There is a very enticing fire flower to your right. Once you travel upwards, you can't come back down because of the one way gates. There could be something that requires a fire flower at the top, or there could be a one tile gap that requires you to be small(not have a powerup)";

  var buttons = document.querySelector(".buttons");

  var button1 = document.createElement("button");
  var button2 = document.createElement("button");

  button1.textContent = "Take powerup";
  button2.textContent = "leave powerup";

  buttons.appendChild(button1);
  buttons.appendChild(button2);

  button1.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";

  buttons.removeChild(button1);
  buttons.removeChild(button2);



    return finalRoom();
  });

    button2.addEventListener("click",() => {
      //remove all the text and buttons from this room, and go to the next room
    describe.textContent = "";

    buttons.removeChild(button1);
    buttons.removeChild(button2);


    return death("There was a bomb at the top of the path, requiring a fireflower to ignite it to blow up a path to the next section");
    });


}

const pickAPath = function(){
  var describe = document.querySelector(".roomDescription");
  describe.textContent = "This room has 3 paths. The top path has a row piranha plants, the middle path has a bunch of bumpers - round blocks that look like donuts and bounce you around, and the bottom path has a bowser jr in a clown car. There is also an arrow pointing to the top path. You can't see to the end of any paths and each path has a one way gate, meaning once you choose there's no going back! Which path will you choose?";

  var choices = document.querySelector("ul");

  var option1 = document.createElement('li');
  var option2 = document.createElement('li');
  var option3 = document.createElement('li');

  option1.textContent = "1)Top path";
  option2.textContent = "2)Middle path";
  option3.textContent = "3)Bottom path";

  choices.appendChild(option1);
  choices.appendChild(option2);
  choices.appendChild(option3);


  var buttons = document.querySelector(".buttons");

  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");

  button1.textContent = "1";
  button2.textContent = "2";
  button3.textContent = "3";

  buttons.appendChild(button1);
  buttons.appendChild(button2);
  buttons.appendChild(button3);

  button1.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  choices.removeChild(option1);
  choices.removeChild(option2);
  choices.removeChild(option3);
  buttons.removeChild(button1);
  buttons.removeChild(button2);
  buttons.removeChild(button3);


  return death("The path leads to a dead end, you take a death to one of the plants");
  });

  button2.addEventListener("click",() => {
      //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  choices.removeChild(option1);
  choices.removeChild(option2);
  choices.removeChild(option3);
  buttons.removeChild(button1);
  buttons.removeChild(button2);
  buttons.removeChild(button3);
  console.log("clicked!");


  return death("The path ends with a row of spikes!");
  });

  button3.addEventListener("click",() => {
        //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  choices.removeChild(option1);
  choices.removeChild(option2);
  choices.removeChild(option3);
  buttons.removeChild(button1);
  buttons.removeChild(button2);
  buttons.removeChild(button3);

  return powerupChoice();
  });
}

const getCheckpoint = function(){
  gotCheckpoint = true;

  var describe = document.querySelector(".roomDescription");
  describe.textContent = "The next room has four doors leading to it, probably the four from the last room. Choosing the correct door awards you with a checkpoint, which is what you did! Congratulations, you got a checkpoint! Doesn't help out too much if you run out of lives though...";

  var buttons = document.querySelector(".buttons");
  var button1 = document.createElement("button");
  button1.textContent = "continue";
  buttons.appendChild(button1);

  button1.addEventListener("click",() => {
  //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  buttons.removeChild(button1);
  return pickAPath();
  });


};

const dontGetCheckpoint = function(){
  var describe = document.querySelector(".roomDescription");
  describe.textContent = "The next room has four doors leading to it, probably the four from the last room. Choosing the correct door awards you with a checkpoint, which you did not...bummer";

  var buttons = document.querySelector(".buttons");
  var button1 = document.createElement("button");
  button1.textContent = "continue";
  buttons.appendChild(button1);

  button1.addEventListener("click",() => {
  //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  buttons.removeChild(button1);
  return pickAPath();
  });
};


const pickADoor = function(){
  var describe = document.querySelector(".roomDescription");
  describe.textContent = "You are brought to a room with four doors. You can see three doors to your right that are directly above the lava. Your not certian, but you're prety sure that choosing the wrong door puts you in the lava. In your shock, you accidently drop the pow, and it explodes. Hopefully you dont need it...";

  var buttons = document.querySelector(".buttons");

  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");
  var button4 = document.createElement("button");

  button1.textContent = "Door 1";
  button2.textContent = "Door 2";
  button3.textContent = "Door 3";
  button4.textContent = "Door 4";

  buttons.appendChild(button1);
  buttons.appendChild(button2);
  buttons.appendChild(button3);
  buttons.appendChild(button4);

  button1.addEventListener("click",() => {
  //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  buttons.removeChild(button1);
  buttons.removeChild(button2);
  buttons.removeChild(button3);
  buttons.removeChild(button4);

  if (correctDoor == 1)
  {
    return getCheckpoint();
  }
  else {
    return dontGetCheckpoint();
  }
  });

  button2.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
    describe.textContent = "";

    buttons.removeChild(button1);
    buttons.removeChild(button2);
    buttons.removeChild(button3);
    buttons.removeChild(button4);

    if (correctDoor == 2)
    {
      return getCheckpoint();
    }
    else {
      return dontGetCheckpoint();
    }

    });

    button3.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
    describe.textContent = "";

    buttons.removeChild(button1);
    buttons.removeChild(button2);
    buttons.removeChild(button3);
    buttons.removeChild(button4);

    if (correctDoor == 3)
    {
      return getCheckpoint();
    }
    else {
      return dontGetCheckpoint();
    }

    });

    button4.addEventListener("click",() => {
      //remove all the text and buttons from this room, and go to the next room
      describe.textContent = "";

      buttons.removeChild(button1);
      buttons.removeChild(button2);
      buttons.removeChild(button3);
      buttons.removeChild(button4);

      if (correctDoor == 4)
      {
        return getCheckpoint();
      }
      else {
        return dontGetCheckpoint();
      }

      });
};


const thwompRoom = function(){
  var describe = document.querySelector(".roomDescription");
  describe.textContent = "You spin jump on the thwomp and a door, on a platform at the top of the room is revealed. Instintlivly, you go through the door. The next room contains a POW block, two giant munchers stacked on top of eachother, and a door. The munchers are inbetween you and the door. You think you can jump over the munchers and save to pow block for the next room. You can also kill the munchers by throwing the POW block at them. You appear to have two options:";

  var choices = document.querySelector("ul");

  var option1 = document.createElement('li');
  var option2 = document.createElement('li');

  option1.textContent = "1)Kill munchers";
  option2.textContent = "2)Jump over the munchers, and save the POW block";

  choices.appendChild(option1);
  choices.appendChild(option2);

  //creates buttons for the player to click on
  var buttons = document.querySelector(".buttons");

  var button1 = document.createElement("button");
  var button2 = document.createElement("button");

  button1.textContent = "1";
  button2.textContent = "2";

  buttons.appendChild(button1);
  buttons.appendChild(button2);

  button1.addEventListener("click",() => {
  //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  choices.removeChild(option1);
  choices.removeChild(option2);

  buttons.removeChild(button1);
  buttons.removeChild(button2);



  return death("You throw the POW block at the munchers, but that triggers something off screen and a crap-ton of ghoombas fall on you head");
  });

  button2.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
    describe.textContent = "";
    choices.removeChild(option1);
    choices.removeChild(option2);

    buttons.removeChild(button1);
    buttons.removeChild(button2);

    return pickADoor();
    });
};

const returnFromDeath = function(){

  document.querySelector('#game').textContent = null;
  var describe = document.querySelector(".roomDescription");
  describe.textContent = "Unshaken, you return to the level. You appear the have 3 options:";

  //creates a list of choices
  var choices = document.querySelector("ul");

  var option1 = document.createElement('li');
  var option2 = document.createElement('li');
  var option3 = document.createElement('li');

  option1.textContent = "1)Go through the door";
  option2.textContent = "2)Trigger the thwomp and spin jump on top of him";
  option3.textContent = "3)Skip the level";

  choices.appendChild(option1);
  choices.appendChild(option2);
  choices.appendChild(option3);


  //creates buttons for the player to click on
  var buttons = document.querySelector(".buttons");

  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");

  button1.textContent = "1";
  button2.textContent = "2";
  button3.textContent = "3";

  buttons.appendChild(button1);
  buttons.appendChild(button2);
  buttons.appendChild(button3);

  button1.addEventListener("click",() => {
  //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  choices.removeChild(option1);
  choices.removeChild(option2);
  choices.removeChild(option3);
  buttons.removeChild(button1);
  buttons.removeChild(button2);
  buttons.removeChild(button3);


  return lavaTrap();
  });

  button2.addEventListener("click",() => {
  //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  choices.removeChild(option1);
  choices.removeChild(option2);
  choices.removeChild(option3);
  buttons.removeChild(button1);
  buttons.removeChild(button2);
  buttons.removeChild(button3);

  return thwompRoom();
  });

  button3.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
    describe.textContent = "";
    choices.removeChild(option1);
    choices.removeChild(option2);
    choices.removeChild(option3);
    buttons.removeChild(button1);
    buttons.removeChild(button2);
    buttons.removeChild(button3);


    return death("You can't bring yourself to do it, it's a no skip run lol. In your indecisiveness you let the timer run out and you lose one of your lives");
    });
}


const gameOver = function(){
  var describe = document.querySelector(".roomDescription");
  describe.textContent = "Looks like YOU are out of lives, how unfortunate";

  var buttons = document.querySelector(".buttons");
  var button1 = document.createElement("button");
  button1.textContent = "continue";
  buttons.appendChild(button1);

  button1.addEventListener("click",() => {
  //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  buttons.removeChild(button1);
  return start();
  });
};

const death = function(cause){

  lives--;
  if (lives == 0){
    return gameOver();
  }
  var describe = document.querySelector(".roomDescription");
  describe.textContent = cause + ". You only have " + lives + " lives left!";

  var buttons = document.querySelector(".buttons");
  var button1 = document.createElement("button");
  button1.textContent = "continue";
  buttons.appendChild(button1);

  button1.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
    describe.textContent = "";
    buttons.removeChild(button1);
    if (gotCheckpoint)
    {
      return pickAPath();
    }
    else {
      return returnFromDeath();
    }
    });
};

const lavaTrap = function(){
  var describe = document.querySelector(".roomDescription");
  return death("The door spawns you on top a a pit of lava, with no floor beneath you. This is the pinnacle of level design");
};

const start = function(){
  gotCheckpoint = false;
  lives = 5;

  document.querySelector('#game').textContent = null;
  var describe = document.querySelector(".roomDescription");
  describe.textContent = "You sit down at your wii u and launch the game \"Super mario maker\" and fire up a super expert no skip run. The run consists of 6 levels and starts you off with 100 lives. You struggle through the first 5 levels, but you do eventually beat them. You are now on the final stage with only 5 of your lives remaining. The level is a New Super Mario Bros style level, castle theme. The level title is some Japaneese characters you don't understand. There is a door to your left, and a thwomp above you and to the right. There is a wall seperating you from the rest of the level. You appear the have 3 options:";

  //creates a list of choices
  var choices = document.querySelector("ul");

  var option1 = document.createElement('li');
  var option2 = document.createElement('li');
  var option3 = document.createElement('li');

  option1.textContent = "1)Go through the door";
  option2.textContent = "2)Trigger the thwomp and spin jump on top of him";
  option3.textContent = "3)Skip the level";

  choices.appendChild(option1);
  choices.appendChild(option2);
  choices.appendChild(option3);


  //creates buttons for the player to click on
  var buttons = document.querySelector(".buttons");

  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");

  button1.textContent = "1";
  button2.textContent = "2";
  button3.textContent = "3";

  buttons.appendChild(button1);
  buttons.appendChild(button2);
  buttons.appendChild(button3);

  button1.addEventListener("click",() => {
  //remove all the text and buttons from this room, and go to the next room
  describe.textContent = "";
  choices.removeChild(option1);
  choices.removeChild(option2);
  choices.removeChild(option3);
  buttons.removeChild(button1);
  buttons.removeChild(button2);
  buttons.removeChild(button3);


  return lavaTrap();
  });

  button2.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
    describe.textContent = "";
    choices.removeChild(option1);
    choices.removeChild(option2);
    choices.removeChild(option3);
    buttons.removeChild(button1);
    buttons.removeChild(button2);
    buttons.removeChild(button3);



    return thwompRoom();
    });

  button3.addEventListener("click",() => {
    //remove all the text and buttons from this room, and go to the next room
    describe.textContent = "";
    choices.removeChild(option1);
    choices.removeChild(option2);
    choices.removeChild(option3);
    buttons.removeChild(button1);
    buttons.removeChild(button2);
    buttons.removeChild(button3);


    return death("You can't bring yourself to do it, it's a no skip run lol. In your indecisiveness you let the timer run out and you lose one of your lives");
      });

  //console.log("hang on, were gaming!");
};


setTimeout(start ,5000);



// var buttons = document.querySelector('#buttons');
// var start = document.createElement('button');
// start.textContent = start;
// buttons.appendChild(start);
