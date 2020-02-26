import { ApiProperty } from "@nestjs/swagger"
import { prop } from "@typegoose/typegoose"

export class RegisterDto {
    @ApiProperty()
    @prop()
    username: string
    @ApiProperty()
    @prop()
    password: string
  }
  