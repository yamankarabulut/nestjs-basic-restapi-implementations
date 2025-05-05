import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    // add the usersService to the constructor as a singleton service
    constructor(private readonly usersService: UsersService) {}

    // GET /users or /users?role=value
    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);     
    }

    // GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        // convert the id to a number using the + operator
        return this.usersService.findOne(+id);
    }

    // POST /users
    @Post()
    create(@Body() user: { name: string, email: string, privateKey: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.create(user);
    }

    // PATCH /users/:id
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: { name?: string, email?: string, privateKey?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.update(+id, userUpdate);
    }

    // DELETE /users/:id
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);     
    }

}
