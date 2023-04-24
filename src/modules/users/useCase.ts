import * as model from "./model.js";
import repository from "./repository.js";

function shortenPublicIds(users: model.TUser[]): model.TUser[] {
  return users.map(user => { return { ...user, publicId: user.publicId.split("-")[1] }; } );
}

export async function listAllUsers(): Promise<model.TUser[]> {
  const users = await repository.getAll();
  return shortenPublicIds(users);
}
