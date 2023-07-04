import { ApiProperty } from "@nestjs/swagger";

export class CreateCategory {
    @ApiProperty()
    name: string
}