import { PayloadDto } from '@libs-common/dtos';
import { BadRequestExceptionMessageEnum } from '@libs-common/enums';
import { comparePassword } from '@libs-common/helpers';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from 'libs/common/repositories';
import { Strategy } from 'passport-local';

@Injectable()
export class UserLocalAuthStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async validate(username: string, password: string): Promise<PayloadDto> {
    const user = await this.userRepository.findByUsername(username);
    const isValidPassword = await comparePassword(password, user?.password);

    if (!user || !isValidPassword) {
      throw new BadRequestException(
        BadRequestExceptionMessageEnum.INCORRECT_CREDENTIALS,
      );
    }

    return {
      username: user.username,
      sub: user.id,
    };
  }
}
