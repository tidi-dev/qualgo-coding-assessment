import * as bcrypt from 'bcrypt';

export async function comparePassword(
  password: string,
  dbPassword = '',
): Promise<boolean> {
  return bcrypt.compare(password, dbPassword);
}
