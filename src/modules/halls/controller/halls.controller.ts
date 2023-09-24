import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { HallService } from '../service/halls.service';
import { CreateHallDto } from '../dto/create-hall.dto';
import { Roles } from '@dec/roles.decorator';
import { RolesGuard } from '../../auth/guard/role.guard';
import { USER_ROLE } from '@utils/enums';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { Public } from '@dec/public.route.decorator';

@Controller('halls')
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  async createHall(@Body() dto: CreateHallDto, @Res() response: Response) {
    const res = await this.hallService.create(dto);
    response.status(res.status).json(res);
  }

  @Public()
  @Get()
  async getAll(@Res() response: Response) {
    const res = await this.hallService.getAll();
    response.status(res.status).json(res);
  }
}
