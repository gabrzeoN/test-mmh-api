import { Users } from "@prisma/client";

export type TUser = Pick<Users, "id" | "publicId" | "name" | "avatarUrl">;
