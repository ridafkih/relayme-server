import { generateDeviceIdentifier } from "@helpers/identity";
import { PrismaClient } from "@prisma/client";

const {
  PGUSER = "defaultUser",
  PGPASSWORD = "defaultPassword",
  PGDATABASE = "defaultDatabase",
  DATABASE_URL = `postgres://${PGUSER}:${PGPASSWORD}@localhost:5432/${PGDATABASE}`,
} = process.env;

console.log(DATABASE_URL);

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
