import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, Length } from "class-validator";

export class CreateBlogDto {
    @ApiProperty({type: "string", format: "binary"})
    image: string;
    @ApiProperty()
    @Length(5, 200)
    title: string;
    @ApiProperty()
    @Length(10, 1000)
    content: string;
    @ApiProperty()
    @Length(3, 100)
    author: string;
    @ApiProperty()
    category: string;
}

