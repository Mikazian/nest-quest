import { Injectable } from '@nestjs/common';

interface User {
  name: string;
  age: number;
}

@Injectable()
export class UserService {
  getUser(): User[] {
    return [
      {
        name: 'John',
        age: 25,
      },
      {
        name: 'Math',
        age: 20,
      },
      {
        name: 'Alex',
        age: 18,
      },
    ];
  }
}
