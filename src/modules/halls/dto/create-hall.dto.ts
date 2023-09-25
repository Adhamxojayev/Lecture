import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateHallDto {
  @ApiProperty({ required: false, default: 100 })
  @IsOptional()
  places: number;
}
