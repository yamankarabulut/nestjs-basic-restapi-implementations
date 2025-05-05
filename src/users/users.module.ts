import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ActionLoggerMiddleware } from '../middleware/action.logger.middleware'; // adjust path as needed

@Module({
    imports: [ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ],
    controllers: [ UsersController ],
    providers: [ UsersService ],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ActionLoggerMiddleware) // apply the middleware to the controller
            .forRoutes({
                path: 'users/:id',
                method: RequestMethod.GET,
            });
    }
}
