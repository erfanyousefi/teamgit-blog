import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(process.cwd(), "public"))
  SwaggerConfig(app)
  await app.listen(3000, () => {
    console.log("Started Server On Port:3000", "http://localhost:3000");
    
  });
}
bootstrap();
