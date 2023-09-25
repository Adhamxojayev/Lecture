import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ required: true, default: 1 })
  @IsNotEmpty()
  @IsInt()
  lectureId: number;

  @ApiProperty({ required: true, example: 23 })
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  @IsInt()
  place_number: number;
}
