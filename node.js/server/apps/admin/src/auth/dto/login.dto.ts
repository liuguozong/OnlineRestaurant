import { ApiProperty } from "@nestjs/swagger"
import { prop } from "@typegoose/typegoose"

export class LoginDto {
    @ApiProperty()
    @prop()
    username: string
    @ApiProperty()
    @prop()
    password: string
  }
  