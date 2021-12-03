const fs = require("fs").promises;

main().then(console.log).catch(console.error);

async function main() {
  const data = await fs.readFile("./blanks-empty.csv");
  console.log(data);
}
