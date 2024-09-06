// auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '@libs-common/dtos';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            validateUser: jest.fn(),  // Mock UserService validateUser method
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),  // Mock JwtService sign method
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
    // Arrange
    const loginDto: UserLoginDto = { username: 'testuser', password: 'testpass' };
    const mockUser = { id: 1, username: 'testuser' };
    
    // Mock the behavior of userService and jwtService
    jest.spyOn(userService, 'validateUser').mockResolvedValue(mockUser);
    jest.spyOn(jwtService, 'sign').mockReturnValue('signed-token');

    // Act
    const result = await authService.login(loginDto);

    // Assert
    expect(userService.validateUser).toHaveBeenCalledWith('testuser', 'testpass');
    expect(jwtService.sign).toHaveBeenCalledWith({
      username: 'testuser',
      sub: 1,
    });
    expect(result).toEqual({ access_token: 'signed-token' });
  });

  it('should throw an error if validateUser fails (user not found)', async () => {
    // Arrange
    const loginDto: UserLoginDto = { username: 'invaliduser', password: 'invalidpass' };
    
    // Mock validateUser to return null (user not found)
    jest.spyOn(userService, 'validateUser').mockResolvedValue(null);

    // Act and Assert
    await expect(authService.login(loginDto)).rejects.toThrow();
    expect(userService.validateUser).toHaveBeenCalledWith('invaliduser', 'invalidpass');
    expect(jwtService.sign).not.toHaveBeenCalled();  // jwtService.sign should not be called if user is invalid
  });
});
