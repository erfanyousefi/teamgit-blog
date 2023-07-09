import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategory } from "./dto/create.dto";
import { Category, CategoryDocument } from "./schema/category.schema";
import { ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { UpdateCategory } from "./dto/update.dto";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post("/")
    @ApiConsumes("application/x-www-form-urlencoded")
    async create(@Body() category: CreateCategory): Promise<Category> {
        return this.categoryService.create(category);
    }
    @Get("/")
    async findAll(): Promise<Category[]> {
        return this.categoryService.find();
    }
    @Get("/by-name/:name")
    @ApiParam({name: "name", type: "string"})
    async findByName(@Param("name") name: string): Promise<Category> {
        return this.categoryService.findByName(name);
    }
    @Get("/by-id/:id")
    @ApiParam({name: "id", type: "string"})
    async findById(@Param("id") id: string): Promise<CategoryDocument> {
        return this.categoryService.findById(id);
    }
    @Delete("/:id")
    @ApiParam({name: "id", type: "string"})
    async deleteById(@Param("id") id: string) {
        await this.categoryService.deleteById(id);
        return {
            message: "category deleted successfully"
        }
    }
    @Put("/:id")
    @ApiParam({name: "id", type: "string"})
    @ApiConsumes("application/x-www-form-urlencoded")
    async update(@Param("id") id: string, @Body() category: UpdateCategory) {
        return await this.categoryService.update(id, category);
    }
}