import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UseGuards, Post, Body, Req, Res, Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/check')
  async checkLogin(
    @Req() req,
    @Body() body: Object,
    @Res({ passthrough: true }) res,
  ) {
    var token = await this.authService.checkLogin(body);
    var user = req.user;
    console.log('user: ', user);
    return res
      .cookie('token', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      })
      .json({ redirect: true });
  }
}
