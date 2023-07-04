import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./schema/category.schema";
import { Model } from "mongoose";
import { CreateCategory } from "./dto/create.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

    async create(category: CreateCategory): Promise<Category> {
        const createdCategory = new this.categoryModel(category);
        return createdCategory.save();
    }
}