import { Injectable } from "@nestjs/common";
import { Blog, BlogDocument } from "./schema/blog.schema";
import { Model, Types } from "mongoose";
import { CategoryService } from "src/category/category.service";
import { InjectModel } from "@nestjs/mongoose";
import { CreateBlogDto } from "./dto/create.dto";

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
}