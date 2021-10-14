import { generateDeviceIdentifier } from "@helpers/identity";
import { PrismaClient } from "@prisma/client";
import { generateSaltHashPair } from "./authentication";

const SALT_ROUNDS = 20000;

const {
  PGUSER = "defaultUser",
  PGPASSWORD = "defaultPassword",
  PGDATABASE = "defaultDatabase",
  DATABASE_URL = `postgres://${PGUSER}:${PGPASSWORD}@localhost:5432/${PGDATABASE}`,
} = process.env;

const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
});

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

interface UserRegistrationInterface {
  email: string;
  avatar: string;
  fullName: string;
  password: string;
}

export const registerNewUser = async (
  userRegistration: UserRegistrationInterface
) => {
  const { email, avatar, password, fullName: full_name } = userRegistration;
  const { salt, hash } = await generateSaltHashPair(password, SALT_ROUNDS);

  const auth = { create: { salt, hash } };

  return prisma.users.create({
    data: {
      email,
      avatar,
      full_name,
      auth,
    },
  });
};
