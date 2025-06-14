import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {} // truyền đối tượng thao tác với dữ liệu db nếu không có thì sẽ không biết cái nào để thao tác

  //   return 'This action adds a new user';
  // }
  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDto.password);
    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    // if (!mogngoose.Types.ObjectId.isValid(id)) {
    //   return 'not found user';
    // }
    // return this.userModel.findOne({
    //   _id: id,
    // });

    try {
      const user = await this.userModel.findOne({ _id: id }).exec(); // exec() để chạy truy vấn rõ ràng
      return user ?? 'not found user';
    } catch (err) {
      throw new InternalServerErrorException('Lỗi server');
    }
  }
  async findOneByUsername(username: string) {
    // if (!mogngoose.Types.ObjectId.isValid(id)) {
    //   return 'not found user';
    // }
    // return this.userModel.findOne({
    //   _id: id,
    // });

    const user = await this.userModel.findOne({ email: username }).exec(); // exec() để chạy truy vấn rõ ràng
    return user;
  }
  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }
  isvalidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`;
    return this.userModel.softDelete({
      _id: id,
    });
  }
}
