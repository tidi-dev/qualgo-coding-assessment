import { UserRepository } from '@libs-common/repositories';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository],
})
export class UserModule {}
