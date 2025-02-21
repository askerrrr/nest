import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

var login = 'Gilgamesh';
var passwd = 'Q9khdcpx';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async checkLogin(body) {
    if (body.passwd == passwd && body.login == login) {
      var payload = { a: login, b: passwd };
      return { token: await this.jwtService.signAsync(payload) };
    } else {
      throw new UnauthorizedException();
    }
  }
}
