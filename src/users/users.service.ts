import { Injectable } from '@nestjs/common';
import { User } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstname', 'lastname', 'email'],
      where: [{ id: id }],
    });
  }

  async saveUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  deleteUser(user: User): void {
    this.usersRepository.delete(user);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email: email });
  }
}
