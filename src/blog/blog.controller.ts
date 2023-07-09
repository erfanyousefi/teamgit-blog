import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create.dto";
import { MulterFile } from "src/common/types/public";
import { CheckRequiredUploadedFile } from "src/common/decorator/upload-file.decorator";
import { MIME_TYPE } from "src/common/enum/mime-type.enum";
import { UploadFile } from "src/common/interceptor/upload-file.interceptor";


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
}