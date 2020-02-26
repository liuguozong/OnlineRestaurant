import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
//增加时间戳//

export class Menu {
    @ApiProperty({description:'名称',example:'123',required: true})
    @IsNotEmpty({ message: '名称不能为空' })
    @prop()
    name: string
    @ApiProperty({description:'图片',example:'123456'})
    @prop()
    icon: string
    @ApiProperty({description:'类型',required: true})
    @IsNotEmpty({ message: '类型不能为空' })
    @prop()
    genre: Array<string>
    @ApiProperty({description:'价钱'})
    @prop()
    price: string
    @ApiProperty({description:'标签'})
    @prop()
    label: string
    @ApiProperty({description:'描述'})
    @prop()
    depict : string

}