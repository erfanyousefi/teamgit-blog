import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiConsumes, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create.dto";
import { MulterFile } from "src/common/types/public";
import { CheckOptionalUploadedFile, CheckRequiredUploadedFile } from "src/common/decorator/upload-file.decorator";
import { MIME_TYPE } from "src/common/enum/mime-type.enum";
import { UploadFile } from "src/common/interceptor/upload-file.interceptor";
import { SwaggerConsumes } from "src/common/enum/swagger.enum";
import { UpdateBlogDto } from "./dto/update.dto";
import { Blog } from "./schema/blog.schema";


@ApiTags("Blog")
@Controller("/blog")
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(UploadFile("image"))
  @HttpCode(HttpStatus.CREATED)
  async create(@CheckRequiredUploadedFile(MIME_TYPE.IMAGE) file: MulterFile, @Body() blog: CreateBlogDto){
    blog.image = file.path.slice(7)
    const result = await this.blogService.create(blog);
    return {
      statusCode: HttpStatus.CREATED,
      message: "created blog successfully"
    };
  }
  @Get()
  @ApiQuery({name: "search", type: "string", required: false})
  @ApiQuery({name: "category", type: "string", required: false})
  async findAll(@Query("search") search: string = "", @Query("category") category: string = ""): Promise<{blogs: Blog[]}> {
    const blogs = await this.blogService.findAll({search, category}); 

    return {blogs}
  }

  @Get(':id')
  @ApiParam({ name: "id", type: "string" })
  async findOne(@Param('id') id: string): Promise<Blog> {
    return await this.blogService.findOne(id);
  }

  @Put(':id')
  @ApiConsumes(SwaggerConsumes.MULTIPART)
  @ApiParam({ name: "id", type: "string" })
  async update(@CheckOptionalUploadedFile(MIME_TYPE.IMAGE) file: MulterFile, @Param('id') id: string, @Body() blog: UpdateBlogDto): Promise<Blog> {
    return await this.blogService.update(id, blog);
  }

  @Delete(':id')
  @ApiParam({ name: "id", type: "string" })
  async delete(@Param('id') id: string): Promise<any> {
    await this.blogService.delete(id);
    return {
      message: "deleted successfully"
    }
  }
}