import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { FilterService } from './filter/filter.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, FilterService],
})
export class AppModule {}
