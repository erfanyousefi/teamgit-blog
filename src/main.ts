import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app)
  await app.listen(3000, () => {
    console.log("Started Server On Port:3000", "http://localhost:3000");
    
  });
}
bootstrap();
