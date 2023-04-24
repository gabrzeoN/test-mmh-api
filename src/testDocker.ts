import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const appDockerTest = express();
appDockerTest
  .use(cors())
  .use(express.json())
  .use("/", (req, res) => {
    res.send("Hello World!");
  });

const port = (+process.env.PORT || 4000);
appDockerTest.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
