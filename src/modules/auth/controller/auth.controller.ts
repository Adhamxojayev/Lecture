import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/register.dto';
import { AuthGuard } from '../guard/auth.guard';
import { USER_ROLE } from '@utils/enums';
import { Roles } from '@dec/roles.decorator';
import { Public } from '@dec/public.route.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('/signin')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully log in',
    schema: {
      example: {
        status: 200,
        data: {
          access_token: 'your access token',
          refresh_token: 'your refresh token',
        },
        message: 'Successfully logged in',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid body',
    schema: { example: { status: 400, data: null, message: 'Bad Request' } },
  })
  async login(@Body() dto: LoginDto, @Res() response: Response) {
    const res = await this.authService.login(dto);
    response.status(res.status).json(res);
  }

  @Public()
  @Post('/signup')
  @ApiCreatedResponse({
    description: 'Successfully registered',
    schema: {
      example: {
        status: 201,
        data: {
          access_token: 'your access token',
          refresh_token: 'your refresh token',
        },
        message: 'Successfully registered',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid body',
    schema: { example: { status: 400, data: null, message: 'Bad Request' } },
  })
  async signUp(@Body() dto: SignUpDto, @Res() response: Response) {
    const res = await this.authService.signUp(dto);
    response.status(res.status).json(res);
  }

  @Roles(USER_ROLE.STUDENT, USER_ROLE.PROFESSOR, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Patch('/refresh')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'refresh',
    description: 'refresh token to get access token',
    required: true,
  })
  @ApiOkResponse({
    description: 'Successfully renewed access token',
    schema: {
      example: {
        status: 200,
        data: {
          access_token: 'your access token',
          refresh_token: 'your refresh token',
        },
        message: 'Token is renewed',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    schema: {
      example: { status: 403, data: null, message: 'Forbidden' },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    schema: {
      example: { status: 401, data: null, message: 'Unauthorized' },
    },
  })
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.headers['refresh'];
    const res = await this.authService.refreshToken(refreshToken);
    response.status(res.status).json(res);
  }
}
