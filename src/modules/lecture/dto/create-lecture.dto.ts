import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: true, default: 1 })
  @IsInt()
  hallId: number;

  @ApiProperty({ required: true, example: '2023-09-25' })
  @IsDateString()
  date: Date;

  @ApiProperty({ required: true, example: '15:00' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  start: string;

  @ApiProperty({ required: true, example: '17:00' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  end: string;
}
