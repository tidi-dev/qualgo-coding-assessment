import { UserLoginDto } from '@libs-common/dtos';
import { UserLoginResponseDto } from '@libs-common/responses';
import { Public } from '@libs-core/decorators';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOkResponse({ type: UserLoginResponseDto, status: HttpStatus.CREATED })
  login(@Body() loginDto: UserLoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }
}
