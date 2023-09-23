import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SignUpDto {
  @IsOptional()
  @Length(2, 100)
  firstname?: string;

  @IsOptional()
  @Length(2, 100)
  lastname?: string;

  @IsOptional()
  @Length(2, 100)
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
