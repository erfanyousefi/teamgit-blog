import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Blog")
@Controller("/blog")
export class BlogController {
    
}