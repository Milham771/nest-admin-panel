import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    session({
      secret: 'sessionsecretkey',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, 
    }),
  );
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req: any, res: any, next: any) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'layout' });

  const hbs = require('hbs');
  hbs.registerHelper('gt', (a, b) => a > b);
  hbs.registerHelper('eq', (a, b) => a === b);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
