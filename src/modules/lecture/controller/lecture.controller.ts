import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from '@dec/roles.decorator';
import { LectureService } from '../service/lecture.service';
import { RolesGuard } from '../../auth/guard/role.guard';
import { USER_ROLE } from '@utils/enums';
import { CreateLectureDto } from '../dto/create-lecture.dto';
import { iReq } from '@utils/interface';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { Public } from '@dec/public.route.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('lecture')
@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @ApiUnauthorizedResponse()
  @ApiCreatedResponse()
  @ApiBearerAuth()
  @Roles(USER_ROLE.PROFESSOR)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  async createLecture(
    @Body() dto: CreateLectureDto,
    @Req() request: iReq,
    @Res() response: Response,
  ) {
    const res = await this.lectureService.create(dto, request.user);
    response.status(res.status).json(res);
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'get all lecture',
  })
  @Public()
  @Get()
  async getAll(@Res() response: Response) {
    const res = await this.lectureService.getAll();
    response.status(res.status).json(res);
  }
}
