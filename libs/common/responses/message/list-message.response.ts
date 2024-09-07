import { ApiProperty } from '@nestjs/swagger';

export class ListMessageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  user: {
    username: string;
  };
}

export class ListAllMessageResponseDto {
  content: string;

  user: {
    username: string;
  };
}
