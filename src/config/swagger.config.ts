import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
export const SwaggerConfig = (app: INestApplication): void => {
    const config = new DocumentBuilder()
    .setTitle("Team Git")
    .setDescription("Api Tool for weblog")
    .setVersion("v0.0.1")
    .build();
    const swaggerDocument = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/", app, swaggerDocument)
}