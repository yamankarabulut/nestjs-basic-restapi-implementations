import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
// import { CreateUserDto } from './DTO/create-user.dto';
// import { UpdateUserDto } from './DTO/update-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findAll(role?: string): Promise<User[]> {
        if (role) return await this.userModel.find({ role }).exec();
        return this.userModel.find().exec();
      }

    async findOne(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
      }


    async create(createUserDto: Partial<User>): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async update(id: string, updateUserDto: Partial<User>): Promise<User | null> {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
      }

    async remove(id: string): Promise<any> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }
}
