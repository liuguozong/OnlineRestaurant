import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, ArrayUnique } from 'class-validator/decorator/decorators'
import{Order} from '../order/order.model' 


@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
//增加时间戳//

export class Seat {
    @ApiProperty({description:'座位名'})
    @prop()
    name: string
    @ApiProperty({description:'容纳人数'})
    @prop()
    max: string
    @ApiProperty({ description: '订单' })
    // 座位只允许有
    @arrayProp({ itemsRef: 'Order'})
    coaches: Ref<Order>[]
}