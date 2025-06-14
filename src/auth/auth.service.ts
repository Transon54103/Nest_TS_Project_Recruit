import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isvalid = this.usersService.isvalidPassword(pass, user.password);
      if (isvalid === true) {
        return user;
      }
    }
    return null;
  }
}
