const Provable = require("provable");
const fs = require("fs").promises;

// count default:1, number of hashes in the series to produce, takes longer depending on how big the number is
// seed defaults to some random string with letters and numbers
const engine = Provable({ count: 10000, seed: "cashgrab" });

// return a random int32 and increments the internal state to the next hash
// const int32 = engine();

// internal state of the engine. Use this to save and resume your engine.
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
console.log(
  "These numbers should be the same:",
  fileNames.length,
  new Set(fileNames).size
);

fs.writeFile("./choices.csv", fileNames.join("\r\n"));

// resuming will re-generate the entire hash chain
// from your seed and pick up where you left off with the index
// const state = engine.state();
// const resumedEngine = Provable(state);
