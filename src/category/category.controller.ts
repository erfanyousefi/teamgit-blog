import { Body, Controller, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategory } from "./dto/create.dto";
import { Category } from "./schema/category.schema";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post("/")
    @ApiConsumes("application/x-www-form-urlencoded")
    async create(@Body() category: CreateCategory): Promise<Category> {
        return this.categoryService.create(category);
    }
}