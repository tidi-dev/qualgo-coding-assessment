import { AuthModule } from '@/auth/auth.module';
import { MessageService } from '@/message/message.service';
import { BaseGateway } from '@/websocket/gateways/base.gateway';
import { ChatService } from '@/websocket/services/chat.service';
import { RoomService } from '@/websocket/services/room.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MessageRepository } from '@libs-common/repositories';
import { redisConfig } from '@libs/configs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { MessageModule } from './message/message.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: redisConfig(configService),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    AuthModule,
    PrismaModule,
    MessageModule,
    UserModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    BaseGateway,
    RoomService,
    ChatService,
    JwtService,
    MessageService,
    MessageRepository,
  ],
})
export class AppModule {}
