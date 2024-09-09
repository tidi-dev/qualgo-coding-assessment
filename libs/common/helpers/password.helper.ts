import * as bcrypt from 'bcryptjs';

export async function comparePassword(
  password: string,
  dbPassword: string,
): Promise<boolean> {
  return !dbPassword || (await bcrypt.compare(password, dbPassword));
}
