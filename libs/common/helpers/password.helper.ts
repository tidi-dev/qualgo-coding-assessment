import * as bcrypt from 'bcrypt';

export async function comparePassword(
  password: string,
  dbPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, dbPassword);
}
