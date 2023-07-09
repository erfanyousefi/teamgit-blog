import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { CategoryModule } from './category/category.module';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/teamgit-weblog"),
    CategoryModule,
    BlogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
