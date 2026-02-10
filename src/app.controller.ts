import { Controller, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req, @Res() res) {
    if (req.isAuthenticated()) {
      return res.redirect('/category');
    }
    return res.redirect('/auth/login');
  }
}
