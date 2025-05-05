import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidRoles } from 'src/common/enums/valid.roles.enum';



export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ unique: true, required: true })
    privateKey: string;

    @Prop({ enum: ValidRoles, default: ValidRoles.INTERN })
    role: ValidRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
