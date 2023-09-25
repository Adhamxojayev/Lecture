import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '@dec/public.route.decorator';
import { ProfessorService } from '../service/professor.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('professor')
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'get all professor',
  })
  @Public()
  @Get()
  async getAll(@Res() response: Response) {
    const res = await this.professorService.getAll();
    response.status(HttpStatus.OK).json(res);
  }
}
