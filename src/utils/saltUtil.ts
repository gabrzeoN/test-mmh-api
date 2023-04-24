import dotenv from "dotenv";
dotenv.config();

export const bcrypt = (+process.env.CRYPT_SALT_SALT || 10);
export const jwt = (process.env.JWT_SALT || "salt");
export const timeToJwtExpires = (process.env.JWT_EXPIRES_IN || "1d");
