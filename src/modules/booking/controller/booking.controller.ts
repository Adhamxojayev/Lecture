import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { BookingService } from '../service/booking.service';
import { Roles } from '@dec/roles.decorator';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { RolesGuard } from '../..//auth/guard/role.guard';
import { USER_ROLE } from '@utils/enums';
import { iReq } from '@utils/interface';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Roles(USER_ROLE.STUDENT)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  async createBooking(
    @Body() dto: CreateBookingDto,
    @Req() request: iReq,
    @Res() response: Response,
  ) {
    const res = await this.bookingService.create(dto, request.user);
    response.status(res.status).json(res);
  }
}
