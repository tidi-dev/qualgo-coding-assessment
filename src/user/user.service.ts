import { BadRequestExceptionMessageEnum } from '@libs-common/enums';
import { comparePassword } from '@libs-common/helpers';
import { UserRepository } from '@libs-common/repositories';
import { UserValidateResponseDto } from '@libs-common/responses';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserValidateResponseDto> {
    const user = await this.userRepository.findByUsername(username);
    const isValidPassword = await comparePassword(password, user?.password);

    if (!user || !isValidPassword) {
      throw new BadRequestException(
        BadRequestExceptionMessageEnum.INCORRECT_CREDENTIALS,
      );
    }

    delete user.password;

    return user;
  }
}
