export const isObjectArray = (val: unknown): val is any =>
  Array.isArray(val) && val.every((element) => typeof element === "object");
