import { BadRequestExceptionMessageEnum } from '@libs-common/enums';
import { comparePassword } from '@libs-common/helpers';
import { UserRepository } from '@libs-common/repositories';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

jest.mock('@libs-common/helpers', () => ({
  comparePassword: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  const mockUser = {
    id: '1',
    username: 'testuser',
    password: 'hashedpassword',
  };

  const notExistedUser = {
    id: '1b3b66d9-2a53-111-98a8-770d22fe4e82',
    username: 'invaliduser',
    password: 'invalidpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException when user is not found', async () => {
    userRepository.findByUsername.mockResolvedValue(null);

    await expect(
      service.validateUser(notExistedUser.username, notExistedUser.password),
    ).rejects.toThrow(
      new BadRequestException(
        BadRequestExceptionMessageEnum.INCORRECT_CREDENTIALS,
      ),
    );

    expect(userRepository.findByUsername).toHaveBeenCalledWith(
      notExistedUser.username,
    );
  });

  it('should throw BadRequestException when password is incorrect', async () => {
    userRepository.findByUsername.mockResolvedValue(mockUser);
    (comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(
      service.validateUser(mockUser.username, notExistedUser.password),
    ).rejects.toThrow(
      new BadRequestException(
        BadRequestExceptionMessageEnum.INCORRECT_CREDENTIALS,
      ),
    );

    expect(userRepository.findByUsername).toHaveBeenCalledWith(
      mockUser.username,
    );
    expect(comparePassword).toHaveBeenCalledWith(
      notExistedUser.password,
      mockUser.password,
    );
  });

  it('should return user when validation is successful', async () => {
    userRepository.findByUsername.mockResolvedValue(mockUser);
    (comparePassword as jest.Mock).mockResolvedValue(true);

    const result = await service.validateUser(mockUser.username, mockUser.password);
    
    const expectedUser = { ...mockUser };
    delete expectedUser.password;
    
    expect(result).toEqual(expectedUser);
  });
});
