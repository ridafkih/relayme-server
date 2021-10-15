import * as bcrypt from "bcrypt";
import { Request } from "express";

interface SaltHashPair {
  salt: string;
  hash: string;
}

/**
 * Sets the user session for the user.
 * @param req The request for the relevant request.
 * @param uuid The UUID of the user.
 */
export const setSession = (req: Request, uuid: string) => {
  req.session.user = uuid;
};

/**
 * Compares a password with a hash.
 * @param password - The password string.
 * @param hash - The stored hash for the password.
 * @returns Promises a boolean value that dictates whether the password matches the hash.
 */
export const checkHashedPassword = async (
  password: string,
  hash: string
): Promise<boolean> => bcrypt.compare(password, hash);

/**
 * Generates a salt-hash pair.
 * @param password - The password to hash.
 * @param rounds - The amount of rounds to encrypt the password.
 * @returns An object containing the salt and hash.
 */
export const generateSaltHashPair = async (
  password: string,
  rounds: number = 8
): Promise<SaltHashPair> => {
  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(password, salt);

  return { salt, hash };
};
