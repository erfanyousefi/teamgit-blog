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
    async find(): Promise<Category[]> {
        return await this.categoryModel.find({}, {}, {sort: {_id: -1}})
    }
    async findById(id: string): Promise<Category> {
        return await this.categoryModel.findById(id)
    }
    async findByName(name: string): Promise<Category> {
        return await this.categoryModel.findOne({name})
    }
    async deleteById(id: string): Promise<void> {
        await this.categoryModel.deleteOne({_id: id})
    }
}