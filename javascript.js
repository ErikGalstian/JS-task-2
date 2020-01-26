//Simply Internship - 2020 Winter: Gladiators game
console.log(
  'Use start(x) command, where x is the number of gladiators to fight'
);
//----------------------------------

class Gladiator {
  constructor(health, power, speed, name, id) {
    this.health = health;
    this.initialHealth = health;
    this.power = power;
    this.speed = speed;
    this.initialSpeed = speed;
    this.name = name;
    this.adrenaline = false;
    this.alive = true;
    this.id = id;
  }
}

// List of gladiators

const gladiatorList = [];

// Number of gladiators (You can set it manually using start(x) command in console, where you)

let gladiators = 10;

// Function that instantiates new gladiators

function newGladiators(gladiators) {
  for (i = 0; i < gladiators; i++) {
    const health = faker.random.number({ min: 80, max: 100 });
    const power = faker.random.number({ min: 2, max: 5, precision: 0.1 });
    const speed = faker.random.number({ min: 1, max: 5, precision: 0.001 });
    const name = faker.name.findName();
    const id = i;
    gladiatorList.push(new Gladiator(health, power, speed, name, id));
    gladiatorAttack(id);
  }
}

// Gladiator attack function

function gladiatorAttack(id) {
  function internalCallback() {
    // Search for a random gladiator
    let enemyId = faker.random.number({
      min: 0,
      max: gladiatorList.length - 1
    });

    // Re-search for another id in case it is gladiator's own id or the enemy gladiator is not alive
    while (enemyId == id || gladiatorList[enemyId].alive == false) {
      enemyId = faker.random.number({ min: 0, max: gladiatorList.length - 1 });
    }

    // Attack
    if (gladiatorList[id].alive) {
      console.log(
        `[${gladiatorList[id].name} x${gladiatorList[id].health.toFixed(
          1
        )}] hits [${gladiatorList[enemyId].name} x${gladiatorList[
          enemyId
        ].health.toFixed(1)}] with power ${gladiatorList[id].power.toFixed(1)}`
      );
      gladiatorList[enemyId].health -= gladiatorList[id].power;

      // Adrenaline buff
      if (
        gladiatorList[enemyId].health <= 30 &&
        gladiatorList[enemyId].adrenaline == false
      ) {
        gladiatorList[enemyId].adrenaline = true;
        gladiatorList[enemyId].initialSpeed *= 3;
        console.log(`${gladiatorList[enemyId].name} has adrenaline rush 💉!`);
      }

      // Death event
      if (gladiatorList[enemyId].health <= 0) {
        if (faker.random.boolean()) {
          gladiatorList[enemyId].health += 50;
          gladiatorList[enemyId].adrenaline = false;
          gladiatorList[enemyId].initialSpeed /= 3;
          console.log(`Caesar showed 👍 to ${gladiatorList[enemyId].name}`);
        } else {
          gladiators--;
          gladiatorList[enemyId].alive = false;
          console.log(`Caesar showed 👎 to ${gladiatorList[enemyId].name}`);
          console.log(`[${gladiatorList[enemyId].name}] dying`);
        }

        // Battle end
        if (gladiators == 1) {
          console.log(
            `[${
              gladiatorList[id].name
            }] won the battle with health x${gladiatorList[id].health.toFixed(
              1
            )}`
          );
          return;
        }
      }
    }

    // Setting up next attack with setTimeout and updated speed using recursion
    const speed =
      gladiatorList[id].initialSpeed *
      (gladiatorList[id].health / gladiatorList[id].initialHealth);
    setTimeout(() => {
      internalCallback();
    }, 500 / speed);
  }

  // Initial Timeout with initial speed
  setTimeout(() => {
    internalCallback();
  }, 500 / gladiatorList[id].initialSpeed);
}

// Setting up start function
function start(x) {
  gladiators = x;
  newGladiators(gladiators);
}
