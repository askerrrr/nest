import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

var login = 'Gilgamesh';
var passwd = 'Acu40929.$';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async verifyFormData(data) {

    if (data.passwd == passwd && data.login == login) {
      return true;
    }
  }

  async checkLogin(data) {
    var validFormData = await this.verifyFormData(data);

    if (!validFormData) {
      throw new UnauthorizedException();
    } else {
      var payload = { a: 'login', b: 'passwd' };
      var token = await this.jwtService.signAsync(payload);

      return token;
    }
  }
}
