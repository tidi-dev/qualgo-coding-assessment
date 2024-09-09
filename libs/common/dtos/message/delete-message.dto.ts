import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class DeleteMessageDto {
  @ApiProperty()
  @IsUUID()
  user_id: string;

  @ApiProperty()
  @IsUUID()
  message_id: string;

  @ApiProperty()
  @IsOptional()
  room_code: string = 'room_1';
}
