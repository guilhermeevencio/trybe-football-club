import * as bcrypt from 'bcryptjs';

class HandleWithPassword {
  static encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  static async comparePasswords(password: string, dbPassword: string): Promise<boolean> {
    const isPasswordEqual = await bcrypt.compare(password, dbPassword);
    return isPasswordEqual;
  }
}

export default new HandleWithPassword();
