import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./schema/category.schema";
import { Model } from "mongoose";
import { CreateCategory } from "./dto/create.dto";
import { UpdateCategory } from "./dto/update.dto";

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
    async findById(id: string): Promise<CategoryDocument> {
        return await this.categoryModel.findById(id)
    }
    async findByName(name: string): Promise<Category> {
        return await this.categoryModel.findOne({name})
    }
    async deleteById(id: string): Promise<void> {
        await this.categoryModel.deleteOne({_id: id})
    }
    async update(id: string, category: UpdateCategory): Promise<Category> {
        await this.categoryModel.updateOne({_id: id}, {$set: category});
        return this.findById(id)
    }
}