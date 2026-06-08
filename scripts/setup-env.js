const fs = require("fs");
const path = require("path");
const readline = require("readline");

const envPath = path.resolve(__dirname, "..", ".env");
const examplePath = path.resolve(__dirname, "..", ".env.example");

function parseEnv(contents) {
  return contents
    .split(/\r?\n/)
    .filter(Boolean)
    .reduce((acc, line) => {
      const [key, ...rest] = line.split("=");
      acc[key] = rest.join("=");
      return acc;
    }, {});
}

function normalizeValue(value) {
  return value?.trim();
}

async function prompt(question, defaultValue) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    const promptText = defaultValue
      ? `${question} (${defaultValue}): `
      : `${question}: `;
    rl.question(promptText, (answer) => {
      rl.close();
      resolve(normalizeValue(answer) || defaultValue);
    });
  });
}

async function main() {
  if (!process.stdin.isTTY || !process.stdout.isTTY || process.env.CI) {
    console.log(
      "Skipping .env prompt because the install is running in a non-interactive environment.",
    );
    return;
  }

  const existingEnv = fs.existsSync(envPath)
    ? parseEnv(fs.readFileSync(envPath, "utf8"))
    : {};

  const createOrUpdate = !fs.existsSync(envPath)
    ? true
    : ["y", "yes"].includes(
        (
          await prompt(
            "A .env file already exists. Do you want to update it? [y/N]",
            "N",
          )
        ).toLowerCase(),
      );

  if (!createOrUpdate) {
    console.log("Keeping existing .env file.");
    return;
  }

  const envValues = {};
  envValues.MONGO_URL = await prompt(
    "Enter your MongoDB connection string",
    existingEnv.MONGO_URL || "mongodb://localhost:27017/todolist",
  );
  envValues.SECRET_KEY = await prompt(
    "Enter your JWT secret key",
    existingEnv.SECRET_KEY || "your_jwt_secret_key",
  );
  envValues.PORT = await prompt(
    "Enter the application port",
    existingEnv.PORT || "3500",
  );

  const envContent =
    Object.entries(envValues)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n") + "\n";

  fs.writeFileSync(envPath, envContent, "utf8");
  console.log(`Wrote environment settings to ${envPath}`);

  if (!fs.existsSync(examplePath)) {
    fs.writeFileSync(
      examplePath,
      "MONGO_URL=mongodb://localhost:27017/todolist\nSECRET_KEY=your_jwt_secret_key\nPORT=3500\n",
      "utf8",
    );
  }
}

main().catch((err) => {
  console.error("Failed to set up .env file:", err);
  process.exit(1);
});
