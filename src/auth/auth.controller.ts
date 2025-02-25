import { AuthService } from './auth.service';
import { Post, Body, Res, Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/check')
  async checkLogin(@Body() body: Object, @Res({ passthrough: true }) res) {
    var token = await this.authService.checkLogin(body);
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    return { redirect: true };
  }
}
