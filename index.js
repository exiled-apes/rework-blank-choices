const Provable = require("provable");
const fs = require("fs").promises;

const SEED_PHRASE = "cashgrab";
const engine = Provable({ count: 10000, seed: SEED_PHRASE });

const choices = [];
const maxChoices = 30;

function makeChoice() {
  const nextHash = engine.next();
  const nextChoice = Provable.toFloat(nextHash, 1, 140, true);
  const nextChoiceInt = Math.floor(nextChoice);
  const isUnique = !choices.includes(nextChoiceInt);
  if (isUnique) choices.push(nextChoiceInt);
  const maxReached = choices.length === maxChoices;
  if (maxReached) return;
  makeChoice();
}

makeChoice();

const fileNames = choices.map((choice) => `${choice}.png`);
fs.writeFile("./choices.csv", fileNames.join("\r\n"));
