import { UserService } from '@/user/user.service';
import { UserLoginDto } from '@libs-common/dtos';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login({ username, password }: UserLoginDto) {
    const user = await this.userService.validateUser(username, password);
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    };
  }
}
