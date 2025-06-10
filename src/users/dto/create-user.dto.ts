import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'không để trống email' })
  email: string;

  @IsNotEmpty({ message: 'không để trống email' })
  password: string;
  name: string;
  address: string;
}
