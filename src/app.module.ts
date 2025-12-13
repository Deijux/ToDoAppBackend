import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://user:password@localhost:27017',
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
