import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE } from '@utils/enums';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ enum: USER_ROLE, required: false })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role: number;
}
