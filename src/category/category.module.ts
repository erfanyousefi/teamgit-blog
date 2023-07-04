import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./schema/category.schema";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
    imports: [
        MongooseModule.forFeature([ {name: Category.name, schema: CategorySchema}])
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: []
})
export class CategoryModule {}