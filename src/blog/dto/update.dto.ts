import { PartialType } from "@nestjs/swagger";
import { CreateBlogDto } from "./create.dto";

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}