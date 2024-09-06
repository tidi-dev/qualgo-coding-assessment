import { ExistingRoom } from '@libs-core/validators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @ExistingRoom({ message: 'Invalid room code' })
  @IsString()
  @IsNotEmpty()
  room_code!: string;

  @ApiProperty()
  @IsNotEmpty()
  content!: string;

  user_id!: string;
}
