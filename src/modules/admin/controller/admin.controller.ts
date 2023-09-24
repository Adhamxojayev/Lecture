import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from '../service/admin.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { USER_ROLE } from '@utils/enums';
import { Roles } from '@dec/roles.decorator';
import { ProfessorDto } from '../../professor/dto/create-professor.dto';
import { RolesGuard } from '../../auth/guard/role.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post('create/professor')
  async createProfessor(@Body() dto: ProfessorDto, @Res() response: Response) {
    const res = await this.adminService.createProfessor(dto);
    response.status(res.status).json(res);
  }
}
