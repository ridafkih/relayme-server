import { generateDeviceIdentifier } from "@helpers/identity";
import { PrismaClient } from "@prisma/client";
import { AuthErrors } from "@typings/Errors";
import {
  checkHashedPassword,
  generateSaltHashPair,
} from "@helpers/authentication";

const {
  PGUSER = "defaultUser",
  PGPASSWORD = "defaultPassword",
  PGDATABASE = "defaultDatabase",
  DATABASE_URL = `postgres://${PGUSER}:${PGPASSWORD}@localhost:5432/${PGDATABASE}`,
} = process.env;

const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
});

interface UserRegistrationInterface {
  email: string;
  avatar: string;
  full_name: string;
  password: string;
}

interface UserLoginInterface {
  email: string;
  password: string;
}

export const getUuidByLoginCredentials = async (
  userLogin: UserLoginInterface
) => {
  const { email, password } = userLogin;

  const { uuid } = await prisma.users.findFirst({ where: { email } });
  const { hash } = await prisma.auth.findFirst({ where: { uuid } });

  const authorized = checkHashedPassword(password, hash);
  return authorized ? uuid : null;
};

/**
 * Registers a new device into the database.
 * @param uuid The attributed users UUID.
 * @returns The resulting row.
 */
export const registerNewDevice = (uuid?: string) => {
  const secret = generateDeviceIdentifier();
  return prisma.devices
    .create({
      data: { secret, uuid },
    })
    .then(({ uuid, secret }) => {
      return { uuid, secret };
    });
};

/**
 * Checks whether the user exists in the database.
 * @param email The email to check for in the database
 * @returns Whether or not the user exists.
 */
export const doesUserExist = async (email: string) => {
  const user = await prisma.users.findUnique({ where: { email } });
  return !!user;
};

/**
 * Registers a new user to the database, and returns the user UUID on success.
 * @param userRegistration The user registration object.
 * @returns A string containing the UUID of the new user.
 */
export const registerNewUser = async (
  userRegistration: UserRegistrationInterface
) => {
  const { email, avatar, password, full_name } = userRegistration;

  const isUserRegistered = await doesUserExist(email);
  if (isUserRegistered) throw Error(AuthErrors.ALREADY_REGISTERED);

  const { salt, hash } = await generateSaltHashPair(password);

  const auth = { create: { salt, hash } };
  const { uuid } = await prisma.users.create({
    data: { email, avatar, full_name, auth },
  });

  return uuid;
};
