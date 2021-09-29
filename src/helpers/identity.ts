import { nanoid } from "nanoid";

/**
 * Generates a unique, 128 character ID.
 * @returns A unique 128 character ID.
 */
export const generateDeviceIdentifier = (): string => nanoid(128);
