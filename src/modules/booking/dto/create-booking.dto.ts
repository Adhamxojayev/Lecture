import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  lectureId: number;

  @IsNotEmpty()
  @Min(1)
  @Max(100)
  @IsInt()
  place_number: number;
}
