import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class ProfessorDto extends BaseEntity {
  @ApiProperty({ required: false, default: null })
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstname: string;

  @ApiProperty({ required: false, default: null })
  @IsOptional()
  @IsString()
  @MinLength(3)
  lastname: string;

  @ApiProperty({ required: true, example: 'Ahror' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ required: true, example: '123456789' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
