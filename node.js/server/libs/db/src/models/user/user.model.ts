import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { hashSync } from 'bcryptjs'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
//增加时间戳//
export class User {
  @ApiProperty({ description: '用户名', example: '123', required: true })
  @IsNotEmpty({ message: '名称不能为空' })
  @prop()
  username: string
  @ApiProperty({ description: '密码', example: '123456' })
  @prop({
    select: false, //默认在查询密码不显示
    get(val) {
      return val
    },
    set(val) {
      return val ? hashSync(val) : val
    }
  })
  password: string

  @ApiProperty({ description: '用户等级', example: '123', required: true })
  @IsNotEmpty({ message: '等级不能为空' })
  @prop()
  gradae: string

  @ApiProperty({ description: '名称'})
  @prop()
  name: string

  @ApiProperty({ description: '用户头像'})
  @prop()
  avatar: string
  
  @ApiProperty({ description: '用户邮箱' })
  @prop()
  email: string

  @ApiProperty({ description: '用户手机号' })
  @prop()
  phone: string

  @ApiProperty({ description: '用户性别', example: '女' })
  @prop()
  @IsNotEmpty({ message: '性别不能为空' })
  gender: string
}
