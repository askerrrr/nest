import { join } from 'path';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Get, Res, Post, Body, Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async getAuthForm(@Res() res: Response) {
    return res.sendFile(
      join(__dirname, '..', '..', 'client', 'html', 'authForm.html'),
    );
  }
  @Post('login/check')
  async checkLogin(@Body() body: Object, @Res({ passthrough: true }) res) {
    var token = await this.authService.checkLogin(body);

    if (!token) {
      res.redirect('/auth/login');
    }

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    return { redirect: true };
  }
}
