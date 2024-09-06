import { MessageService } from '@/message/message.service';
import { MessageRepository } from '@libs-common/repositories';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let service: MessageService;
  let jwtService: JwtService;
  let messageRepository: MessageRepository;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        MessageService,
        JwtService,
        {
          provide: MessageRepository,
          useValue: {
            createMessage: jest.fn(),
            listMessages: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(10),
          },
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    service = module.get<MessageService>(MessageService);
    jwtService = module.get<JwtService>(JwtService);
    messageRepository = module.get<MessageRepository>(MessageRepository);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
