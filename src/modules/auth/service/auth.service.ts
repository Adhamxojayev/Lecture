import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../user/repository/user.repository';
import { LoginDto } from '../dto/login.dto';
import { bcryptHelper, jwtHelper } from '@utils/helper';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.exception';
import { I_TOKEN } from '@utils/interface';
import { SignUpDto } from '../dto/register.dto';
import { TOKEN } from '@utils/types';
import { ProfessorRepository } from '../../../modules/professor/repository/professor.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(ProfessorRepository)
    private readonly professorRepository: ProfessorRepository,
  ) {}

  async login(dto: LoginDto): Promise<BaseResponse<I_TOKEN>> {
    try {
      let user;
      if (dto.role && dto.role == 3) {
        user = await this.professorRepository.getProfessorByName(dto.username);

        if (!user) {
          return {
            status: HttpStatus.BAD_REQUEST,
            data: null,
            message: 'Invalid name or password',
          };
        }

        const isValidPasswd = await bcryptHelper.isMatch(
          user.password,
          dto.password,
        );
        if (!isValidPasswd) {
          return {
            status: HttpStatus.BAD_REQUEST,
            data: null,
            message: 'Invalid name or password',
          };
        }
      } else {
        user = await this.userRepository.getUserByName(dto.username);

        if (!user) {
          return {
            status: HttpStatus.BAD_REQUEST,
            data: null,
            message: 'Invalid name or password',
          };
        }

        const isValidPasswd = await bcryptHelper.isMatch(
          user.password,
          dto.password,
        );
        if (!isValidPasswd) {
          return {
            status: HttpStatus.BAD_REQUEST,
            data: null,
            message: 'Invalid name or password',
          };
        }
      }

      const ACCESS_TOKEN = jwtHelper.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        {
          expiresIn: '1d',
        },
      );

      const REFRESH_TOKEN = jwtHelper.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        {
          expiresIn: '15d',
        },
      );

      return {
        status: HttpStatus.OK,
        data: { access_token: ACCESS_TOKEN, refresh_token: REFRESH_TOKEN },
        message: 'OK',
      };
    } catch (err) {
      ServiceExceptions.handle(err, AuthService.name, 'login');
    }
  }

  async signUp(dto: SignUpDto): Promise<BaseResponse<I_TOKEN>> {
    try {
      const user = await this.userRepository.getUserByName(dto.username);
      if (user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'This username already exists',
        };
      }

      dto.password = await bcryptHelper.hash(dto.password);

      const newUser = await this.userRepository.createUser(dto);

      const ACCESS_TOKEN = jwtHelper.sign(
        {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        },
        {
          expiresIn: '1d',
        },
      );

      const REFRESH_TOKEN = jwtHelper.sign(
        {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        },
        {
          expiresIn: '15d',
        },
      );

      return {
        status: HttpStatus.CREATED,
        data: { access_token: ACCESS_TOKEN, refresh_token: REFRESH_TOKEN },
        message: 'Successfully registered',
      };
    } catch (err) {
      ServiceExceptions.handle(err, AuthService.name, 'signUp');
    }
  }

  async refreshToken(refreshToken: string): Promise<BaseResponse<I_TOKEN>> {
    try {
      const decodedToken = jwtHelper.verify(refreshToken) as TOKEN;
      if (decodedToken instanceof Error) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
          message: 'Forbidden',
        };
      }
      const user = await this.userRepository.getUserByName(
        decodedToken.username,
      );
      if (!user) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          data: null,
          message: 'UNAUTHORIZED',
        };
      }

      const ACCESS_TOKEN = jwtHelper.sign(
        { id: user.id, username: user.username, role: user.role },
        { expiresIn: '1d' },
      );

      return {
        status: HttpStatus.OK,
        data: { access_token: ACCESS_TOKEN, refresh_token: refreshToken },
        message: 'Token is renewed',
      };
    } catch (err) {
      ServiceExceptions.handle(err, AuthService.name, 'refreshToken');
    }
  }
}
