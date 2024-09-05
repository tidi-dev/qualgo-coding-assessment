import { PayloadDto, UserLoginDto } from '@libs-common/dtos';
import { UserLoginResponseDto } from '@libs-common/responses';
import { Public } from '@libs-core/decorators';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLocalAuthGuard } from './user/user-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(UserLocalAuthGuard)
  @Public()
  @ApiOkResponse({ type: UserLoginResponseDto, status: HttpStatus.CREATED })
  loginAdmin(@Body() loginDto: UserLoginDto, @Request() req: PayloadDto): any {
    return this.authService.login(loginDto, req.sub);
  }
}
