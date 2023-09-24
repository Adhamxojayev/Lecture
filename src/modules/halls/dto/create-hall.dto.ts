import { IsOptional } from 'class-validator';

export class CreateHallDto {
  @IsOptional()
  places: number;
}
