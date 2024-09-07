import { AuthModule } from '@/auth/auth.module';
import { MessageService } from '@/message/message.service';
import { ChatGateway } from '@/websocket/chat/chat.gateway';
import { ChatService } from '@/websocket/chat/chat.service';
import { ConnectionService } from '@/websocket/chat/connection.service';
import { RoomService } from '@/websocket/chat/room.service';
import { MessageRepository } from '@libs-common/repositories';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    ConnectionService,
    ChatService,
    RoomService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ChatGateway,
    MessageService,
    JwtService,
    MessageRepository,
  ],
})
export class AppModule {}
