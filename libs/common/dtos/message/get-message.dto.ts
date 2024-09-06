import { ExistingRoom } from '@libs-core/validators';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class GetMessageDto {
  @ApiProperty()
  @ExistingRoom({ message: 'Invalid room code' })
  @IsNotEmpty()
  @IsString()
  room_code!: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  limit?: number;
}
