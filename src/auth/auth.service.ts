import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

var login = 'Gilgamesh';
var passwd = 'Q9khdcpx';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async checkLogin(res, body) {
    if (body.passwd == passwd && body.login == login) {
      var payload = { a: login, b: passwd };
      var token = await this.jwtService.signAsync(payload);

      return res
        .cookie('token', token, {
          secure: true,
          httpOnly: true,
        })
        .json({ redirect: true });
    } else {
      throw new UnauthorizedException();
    }
  }
}
