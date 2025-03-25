import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { AdminDataDto } from './auth.guard.dto';
import { AdminCollectionService } from '../database/admin-collection.service';

var hashedLogin = 'Gilgamesh';
var hashedPasswd = 'Acu40929.$';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminCollection: AdminCollectionService,
  ) {}

  async getAdminData() {
    return await this.adminCollection.getAdminData();
  }

  async verifyFormData(login: string, passwd: string): Promise<boolean> {
    //var { hashedLogin, hashedPasswd }: any = await this.getAdminData();

    // return (
    //   (await argon2.verify(hashedLogin, login)) &&
    //   (await argon2.verify(hashedPasswd, passwd))
    // );

    return hashedLogin == login && hashedPasswd == passwd;
  }

  async checkLogin(login: string, passwd: string): Promise<boolean | string> {
    var validFormData = await this.verifyFormData(login, passwd);

    if (!validFormData) {
      return false;
    } else {
      var payload = { a: 'login', b: 'passwd' };

      var token = await this.jwtService.signAsync(payload);

      return token;
    }
  }
}
