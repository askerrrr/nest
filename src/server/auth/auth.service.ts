import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AdminData, LoginCredentials } from './auth.guard.dto';
import { AdminCollectionService } from '../database/admin-collection.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminCollectionService: AdminCollectionService,
  ) {}

  async verifyFormData({ login, passwd }: LoginCredentials): Promise<boolean> {
    var { hashedLogin, hashedPasswd }: AdminData =
      await this.adminCollectionService.getAdminData();

    if (!(await argon2.verify(hashedLogin, login))) {
      return false;
    }

    return await argon2.verify(hashedPasswd, passwd);
  }

  async checkLogin(data: LoginCredentials): Promise<string | false> {
    var validFormData: boolean = await this.verifyFormData(data);

    if (!validFormData) {
      return false;
    } else {
      var payload = { payload: data.login };

      var token = await this.jwtService.signAsync(payload);

      return token;
    }
  }
}
