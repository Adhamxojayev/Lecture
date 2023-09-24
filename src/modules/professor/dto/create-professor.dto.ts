import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class ProfessorDto extends BaseEntity {
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstname: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
