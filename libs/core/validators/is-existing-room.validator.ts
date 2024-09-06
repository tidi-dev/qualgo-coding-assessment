import { ChatRoomRepository } from '@libs-common/repositories';
import { Injectable } from '@nestjs/common';
import type {
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint, registerDecorator } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'IsExistingRoom', async: false })
export class ExistingRoomConstraint implements ValidatorConstraintInterface {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

  async validate(code: string): Promise<boolean> {
    return await this.chatRoomRepository.isExistingRoom(code);
  }
}

export function ExistingRoom(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: ExistingRoomConstraint,
    });
  };
}
