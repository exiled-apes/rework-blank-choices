const Provable = require("provable");
const fs = require("fs").promises;

const MIN = 1;
const MAX = 140;
const MAX_CHOICES = 30;
const SEED_PHRASE = "cashgrab";

const engine = Provable({ count: 10000, seed: SEED_PHRASE });
const choices = [];

function makeChoice() {
  const nextHash = engine.next();
  const nextChoice = Provable.toFloat(nextHash, MIN, MAX, true);
  const nextChoiceInt = Math.floor(nextChoice);
  const isUnique = !choices.includes(nextChoiceInt);
  if (isUnique) choices.push(nextChoiceInt);
  const maxReached = choices.length === MAX_CHOICES;
  if (maxReached) return;
  makeChoice();
}

makeChoice();

const fileNames = choices.map((choice) => `${choice}.png`);
fs.writeFile("./choices.csv", fileNames.join("\r\n"));
