import { UserService } from '@/user/user.service';
import { UserLoginDto } from '@libs-common/dtos';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  const mockUser = {
    id: '1b3b66d9-2a53-4733-98a8-770d22fe4e82',
    username: 'testuser',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return an access token when login is successful', async () => {
    const loginDto: UserLoginDto = {
      username: 'testuser',
      password: 'testpass',
    };

    jest.spyOn(userService, 'validateUser').mockResolvedValue(mockUser);
    jest.spyOn(jwtService, 'sign').mockReturnValue('signed-token');

    const result = await authService.login(loginDto);

    expect(userService.validateUser).toHaveBeenCalledWith(
      'testuser',
      'testpass',
    );
    expect(jwtService.sign).toHaveBeenCalledWith({
      username: 'testuser',
      sub: '1b3b66d9-2a53-4733-98a8-770d22fe4e82',
    });
    expect(result).toEqual({ access_token: 'signed-token' });
  });

  it('should throw an error if validateUser fails (user not found)', async () => {
    const loginDto: UserLoginDto = {
      username: 'invaliduser',
      password: 'invalidpass',
    };

    jest.spyOn(userService, 'validateUser').mockResolvedValue(null);

    await expect(authService.login(loginDto)).rejects.toThrow();
    expect(userService.validateUser).toHaveBeenCalledWith(
      'invaliduser',
      'invalidpass',
    );
    expect(jwtService.sign).not.toHaveBeenCalled();
  });
});
