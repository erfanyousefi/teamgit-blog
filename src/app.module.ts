import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { CategoryModule } from './category/category.module';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://root:i7IPSwHT6t3TK0peDaXUGE8r@team-git-db:27017/my-app?authSource=admin"),
    CategoryModule,
    BlogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
