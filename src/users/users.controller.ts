import { Body, Controller, Delete, Get, Param, ParseIntPipe, ValidationPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { ValidRoles } from 'src/common/enums/valid.roles.enum';

@Controller('users')
export class UsersController {

    // add the usersService to the constructor as a singleton service
    constructor(private readonly usersService: UsersService) {}

    // GET /users or /users?role=value
    @Get()
    findAll(@Query('role') role?: ValidRoles) {
        return this.usersService.findAll(role);    
    }

    // GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    // POST /users
    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // PATCH /users/:id
    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    // DELETE /users/:id
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);     
    }
}
