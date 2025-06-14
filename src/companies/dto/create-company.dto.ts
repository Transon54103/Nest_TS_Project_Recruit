import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateCompanyDto {
  @IsNotEmpty({ message: 'không để trống trên công ty' })
  name: string;

  @IsNotEmpty({ message: 'không để trống mô tả công ty' })
  description: string;

  @IsNotEmpty({ message: 'không để trống địa chỉ công ty' })
  address: string;
}
