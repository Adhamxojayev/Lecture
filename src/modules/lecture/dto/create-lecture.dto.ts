import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateLectureDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsInt()
  hallId: number;

  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  start: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  end: string;
}
