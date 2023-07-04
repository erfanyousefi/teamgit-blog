import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { CategoryModule } from './category/category.module';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/teamgit-weblog"),
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
