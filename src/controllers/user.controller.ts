import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from 'src/filter/filter.service';
import { UserService } from 'src/services/user.service';

interface User {
  name: string;
  age: number;
}

@Controller('/user')
export class UserController {
  constructor(
    private readonly filterService: FilterService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getUser(@Query('name') name: string): User[] {
    // use UserService to get users
    const users = this.userService.getUser();

    // filter users by name
    return this.filterService.filterUsers(users, name);
  }
}
