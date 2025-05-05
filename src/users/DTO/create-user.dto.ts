import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ValidRoles } from 'src/common/enums/valid.roles.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'name must be provided' })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'email must be provided' })
    email: string;

    privateKey: string;

    @IsEnum(ValidRoles, { message: 'role must be one of the following: INTERN, ENGINEER, ADMIN' })
    @IsNotEmpty()
    role: ValidRoles;
}