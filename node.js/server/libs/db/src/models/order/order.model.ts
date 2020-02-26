import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
//增加时间戳//

export class Order {
    @ApiProperty({description:'名称'})
    @prop()
    comment: string
    @ApiProperty({description:'文件'})
    @prop()
    file: string
}