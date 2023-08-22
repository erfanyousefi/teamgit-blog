import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Blog, BlogDocument } from "./schema/blog.schema";
import { Model, Types } from "mongoose";
import { CategoryService } from "src/category/category.service";
import { InjectModel } from "@nestjs/mongoose";
import { CreateBlogDto } from "./dto/create.dto";
import { UpdateBlogDto } from "./dto/update.dto";
import { isMongoId } from "class-validator";
import { ISearch } from "./interfaces/blog.interface";
import { log } from "console";

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
        private CategoryService: CategoryService
      ) { }
    
      async create(blog: CreateBlogDto) {
        const category = await this.CategoryService.findById(blog.category);
        delete blog.category;
        const newBlog = await this.blogModel.create({
          title: blog.title,
          image: blog.image,
          content: blog.content,
          author: blog.author,
          category: new Types.ObjectId(category._id)
        });
        return newBlog
      }
      async findAll(query: ISearch) {
        let match = {}
        if(query.search) {
          match["$or"] = [
            {title: { $regex: new RegExp(query.search, 'gi') }},
            {content: { $regex: new RegExp(query.search, 'gi') }},
          ]
        }
        if(query.category) {
          match["category"] = { $regex: new RegExp(query.category, 'gi') }
        }
        console.log(match);
        
        const blogs = await this.blogModel.aggregate([
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            }
          },
          {$unwind: "$category"},
          {
            $addFields: {
              category: "$category.name"
            }
          },
          {
            $match: match
          }
        ])
        return blogs
      }
    
      async findOne(id: string) {
        if(!isMongoId(id)) throw new BadRequestException("blog id is invalid")
        const [blog] = await this.blogModel.aggregate([
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            }
          },
          {$unwind: "$category"},
          {
            $addFields: {
              category: "$category.name"
            }
          },
          {
            $match: {_id: new Types.ObjectId(id)}
          }
        ]); 
        if(!blog) throw new NotFoundException("not found blog")
        return blog
      }
    
      async update(id: string, blog: UpdateBlogDto): Promise<Blog> {
        if(blog.category && isMongoId(blog.category)){
          const category = await this.CategoryService.findById(blog.category);
          blog.category = category._id
        }
        return await this.blogModel.findByIdAndUpdate(id, blog)
      }
    
      async delete(id: string): Promise<any> {
        if(!isMongoId(id)) throw new BadRequestException("blog id is invalid");
        const blog = await this.blogModel.findById(id);
        if(!blog) throw new NotFoundException("not found blog")
        await this.blogModel.deleteOne({_id: id})
      }
}