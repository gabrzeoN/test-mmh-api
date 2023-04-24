import dotenv from "dotenv";
import prisma from "../src/config/database.js";
import * as err from "../src/utils/errorUtil.js";

dotenv.config();
const { NODE_ENV } = process.env;

async function main() {
  console.log("RUNNING DB SEED!");
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
