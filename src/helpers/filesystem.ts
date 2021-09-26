/**
 * Gets the filename of the provided filename in the provided directory.
 * @param filename - The __filename of the target file.
 * @param dirname - The __dirname of the target directory.
 */
export const getFileFromPath = (filename: string, dirname: string): string => {
  return filename.slice(dirname.length + 1).split(".")[0];
};
