import { UserLoginDto } from '@libs-common/dtos';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login({ username }: UserLoginDto, sub: string) {
    return {
      access_token: this.jwtService.sign({ username, sub }),
    };
  }
}
