import { CreateMessageDto, GetMessageDto } from '@libs-common/dtos';
import { MessageRepository } from '@libs-common/repositories';
import { ListMessageResponseDto } from '@libs-common/responses';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let messageRepository: MessageRepository;
  let configService: ConfigService;

  const mockCreateMessageDto: CreateMessageDto = {
    user_id: '123',
    room_code: 'room_1',
    content: 'This is a test message',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
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

    service = module.get<MessageService>(MessageService);
    messageRepository = module.get<MessageRepository>(MessageRepository);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call createMessage with the correct dto', async () => {
    await service.create(mockCreateMessageDto);

    expect(messageRepository.createMessage).toHaveBeenCalledWith(
      mockCreateMessageDto,
    );
  });

  it('should call listMessages with correct parameters including the limit from config', async () => {
    const limitPerPage = 10;
    const query: GetMessageDto = { room_code: 'room_1' };

    // Mock the return value of configService.get
    (configService.get as jest.Mock).mockReturnValue(limitPerPage);

    // Mock the response of listMessages
    const messages: ListMessageResponseDto[] = [
      {
        id: 'c4be10b2-96ab-49e5-8d62-985a18d3fdc0',
        content: 'from user 1 new',
        created_at: new Date('2024-09-06T12:20:35.203Z'),
        user: {
          username: 'user_1',
        },
      },
      {
        id: '9399379d-ae1d-460f-bcef-91c7916f5136',
        content: 'from user 1 new',
        created_at: new Date('2024-09-06T12:20:35.203Z'),
        user: {
          username: 'user_1',
        },
      },
    ];
    
    jest.spyOn(messageRepository, 'listMessages').mockResolvedValue(messages);

    const result = await service.getMessages(query);

    expect(configService.get).toHaveBeenCalledWith('LIMIT_PER_PAGE');

    expect(messageRepository.listMessages).toHaveBeenCalledWith({
      ...query,
      limit: limitPerPage,
    });
    expect(result).toBe(messages);
  });
});
