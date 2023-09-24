import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '@dec/public.route.decorator';
import { ProfessorService } from '../service/professor.service';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Public()
  @Get()
  async getAll(@Res() response: Response) {
    const res = await this.professorService.getAll();
    response.status(HttpStatus.OK).json(res);
  }
}
