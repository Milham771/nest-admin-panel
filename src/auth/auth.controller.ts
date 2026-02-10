import { Controller, Get, Post, Render, UseGuards, Res, Req } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Render('auth/login')
  loginPage(@Req() req, @Res() res) {
    if (req.isAuthenticated()) {
      return res.redirect('/category');
    }
    return { title: 'Login' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res) {
    res.redirect('/category');
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.logout(() => {
      res.redirect('/auth/login');
    });
  }
}