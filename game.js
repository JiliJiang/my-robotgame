var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min) + min);
  return value;
};

var fightOrSkip = function () {
  var promptFight = window.prompt(
    'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
  );

  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  choice = promptFight.toLowerCase();
  return choice;
};

var getPlayerName = function () {
  let name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  return name;
};

var player = {
  name: getPlayerName(),
  health: randomNumber(30, 40),
  attack: randomNumber(10, 14),
  money: 20,
};

var enemies = [
  {
    name: "Roborto",
    health: randomNumber(50, 60),
    attack: randomNumber(10, 14),
  },

  {
    name: "Alice",
    health: randomNumber(50, 60),
    attack: randomNumber(10, 14),
  },

  {
    name: "Bob",
    health: randomNumber(50, 60),
    attack: randomNumber(10, 14),
  },
];

var mainGame = function () {
  for (i = 0; i < enemies.length; i++) {
    window.alert("Welcome to Game Round - " + (i + 1));
    player.health += 30;
    window.alert(
      "Your robot's name is: " +
        player.name +
        "\nYour robot's health is: " +
        player.health +
        "\nYour robot's attack is: " +
        player.attack +
        "\nYour robot's money is: " +
        player.money
    );

    let enemy = enemies[i];

    window.alert(
      "Enemey robot's name is: " +
        enemy.name +
        "\nEnemy robot's health is: " +
        enemy.health +
        "\nEnemy robot's attack is: " +
        enemy.attack
    );
    fight(enemy);

    if (i < enemies.length - 1) {
      shop();
    }
  }
  window.alert("You have had " + i + "rounds. \nGame Over!");
  window.alert("Your final score is: " + player.money);

  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }

  if (player.money > highScore) {
    localStorage.setItem("highscore", player.money);
    localStorage.setItem("name", player.name);

    alert(player.name + " now has the high score of " + player.money + "!");
  } else {
    alert(
      player.name +
        " did not beat the high score of " +
        highScore +
        ". Maybe next time!"
    );
  }
};

var fight = function (enemy) {
  while (true) {
    fightOrSkip();
    if (choice === "skip") {
      window.alert("See you next round!");
      break;
    }

    enemy.health = Math.max(0, enemy.health - player.attack);
    window.alert(
      player.name +
        " attacked " +
        enemy.name +
        ". " +
        enemy.name +
        " now has " +
        enemy.health +
        " health remaining."
    );
    
    if (enemy.health <= 0 ) {
      window.alert(enemy.name + " has died. End of this round!");
      player.money = player.money + 20;
      window.alert(
        "Your robot " + player.name + " now has a fund of: " + player.money
      );
      break;
    }

    player.health = Math.max(0, player.health - enemy.attack);
    window.alert(
      enemy.name +
        " attacked " +
        player.name +
        ". " +
        player.name +
        " now has " +
        player.health +
        " health remaining."
    );

    if (player.health <= 0) {
      window.alert(player.name + " has died. End of this round!");
      break;
    } 
  }
};

var shop = function () {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);

  switch (shopOptionPrompt) {
    case 1:
      if (player.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
        player.health += 20;
        player.money -= 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;
    case 2:
      if (player.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        player.attack += 6;
        player.money -= 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};

mainGame();
