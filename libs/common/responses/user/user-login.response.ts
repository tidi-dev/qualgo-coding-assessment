import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserLoginResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  access_token: string;
}
