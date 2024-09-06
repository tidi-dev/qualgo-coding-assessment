import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'libs/common/repositories';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './jwt/jwt-auth.strategy';
import { UserLocalAuthStrategy } from './user/user-auth.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '10m',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserLocalAuthStrategy,
    JwtAuthStrategy,
    UserRepository,
  ],
})
export class AuthModule {}
