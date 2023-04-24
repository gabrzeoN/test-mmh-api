import prisma from "../../config/database.js";
import * as model from "./model.js";

async function insertSignUp(table: string, user: model.SignUpModelDB) {
  return await prisma[table].create({ data: user });
}

async function getByEmail(table: string, email: string) {
  return await prisma[table].findUnique( { where: { email } } );
}

const repository = {
  getByEmail,
  insertSignUp,
};

export default repository;
