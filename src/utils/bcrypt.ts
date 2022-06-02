import bcrypt from "bcrypt";

export const hashPassword = async (password: string, salt: number) => {
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const verifyPassword = async (
  password: string,
  hashPassword: string
) => {
  const valid = bcrypt.compare(password, hashPassword);
  return valid;
};
