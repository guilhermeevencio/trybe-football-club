import * as bcrypt from 'bcryptjs';

class HandleWithPassword {
  static async comparePasswords(password: string, dbPassword: string): Promise<boolean> {
    const isPasswordEqual = await bcrypt.compare(password, dbPassword);
    return isPasswordEqual;
  }
}

export default HandleWithPassword;
