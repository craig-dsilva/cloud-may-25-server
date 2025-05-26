import express from "express";
import { Client } from "pg";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import "dotenv/config";

const secret_name = "hotel-db-url";

const smClient = new SecretsManagerClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

let response;

try {
  response = await smClient.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT",
    })
  );
} catch (error) {
  throw error;
}

const secret = response.SecretString;

console.log(secret);

const app = express();
const pgClient = new Client({
  connectionString: secret,
});

await pgClient
  .connect()
  .then(() => console.log("Connected to Database..."))
  .catch((err) => console.error(`Database connection error: ${err}`));

app.get("/", (req, res) => res.send("Hello World"));

app.listen(3000);
