import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import * as config from 'config';

const typeOrmConfig = {
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  ...config.get('db') as object
}

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule
  ]
})
export class AppModule { }
