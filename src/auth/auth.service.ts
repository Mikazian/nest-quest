import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate the user in parameter
   */
  async validate(email: string): Promise<any> {
    return this.usersService.getUserByEmail(email);
  }

  private hash(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  public async login(user: User): Promise<any | { status: number }> {
    return this.validate(user.email).then((userData) => {
      // user not found
      if (!userData || userData.password != this.hash(user.password)) {
        return { status: 404 };
      }

      // user found
      const payload = `${userData.email}`;
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
      };
    });
  }

  public async register(user: User): Promise<any> {
    user.password = this.hash(user.password);

    return this.usersService.saveUser(user);
  }
}
