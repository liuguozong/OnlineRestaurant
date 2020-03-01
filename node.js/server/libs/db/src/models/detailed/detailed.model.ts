import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, ArrayUnique } from 'class-validator/decorator/decorators'
import { Order } from '../order/order.model'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
//增加时间戳//
export class Detailed {
  //订单ID
  @arrayProp({ itemsRef: 'Order' })
  order: Ref<Order>[]
  @ApiProperty({ description: '菜单' })
  @prop()
  menu: Array<string>
  @ApiProperty({ description: '总价' })
  @prop()
  total: string
}
