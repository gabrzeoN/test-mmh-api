import * as model from "./model.js";
import prisma from "../../config/database.js";


async function getAll(): Promise<model.TUser[]> {
  return await prisma.users.findMany( { select: {
    id: true,
    publicId: true,
    name: true,
    avatarUrl: true
  } } );
}

const repository = {
  getAll,
};

export default repository;
