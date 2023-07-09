import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { CategoryService } from "src/category/category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Blog, BlogSchema } from "./schema/blog.schema";
import { Category, CategorySchema } from "src/category/schema/category.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Blog.name, schema: BlogSchema},
            {name: Category.name, schema: CategorySchema},
        ])
    ],
    controllers: [BlogController],
    providers: [BlogService, CategoryService],
    exports: []
})
export class BlogModule {}