export const regex = (
  value: string,
  options: { pattern: RegExp; errorMessage: string }
) => {
  //if (!isString(value)) throw new Error("We need string...");

  if (value === "") return true;

  if (options.pattern === undefined) throw new Error("No pattern...");

  const match = value.match(options.pattern);

  if (match === null || match[0] !== value) {
    return options.errorMessage;
  } /* else if () {
    return options.errorMessage;
  } */

  return true;
};
