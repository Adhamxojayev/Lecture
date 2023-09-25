import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Length(2, 100)
  firstname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(2, 100)
  lastname?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
