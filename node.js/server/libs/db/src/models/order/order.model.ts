import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import{User} from '../user/user.model' 
import { Seat } from '../seat/seat.model'
import { Detailed } from '../detailed/detailed.model'
import { Menu } from '../menu/menu.model'
@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
//增加时间戳//

export class Order {
    // 用户
    @arrayProp({ itemsRef: 'User'})
    user: Ref<User>[]
     // 座位
    @arrayProp({ itemsRef: 'Seat'})
    seats: Ref<Seat>[]
    //菜品ID
    @arrayProp({ itemsRef: 'Menu'})
    menus: Ref<Menu>[]
   //  详细订单
    @arrayProp({ itemsRef: 'Detailed'})
    detailed: Ref<Detailed>[]
    @ApiProperty({description:'评价'})
    @prop()
    evaluate: string
    @ApiProperty({description:'图片'})
    @prop()
    icon:  Array<string>
    @ApiProperty({description:'味道评分'})
    @prop()
    taste: number
    @ApiProperty({description:'服务评分'})
    @prop()
    service: number
    @ApiProperty({description:'环境评分'})
    @prop()
    surroundings: number
    @ApiProperty({description:'当前状态'})
    @prop()
    state: string
    @ApiProperty({description:'总价'})
    @prop()
    total: string
    @ApiProperty({description:'支付方式'})
    @prop()
    mode: string
    @ApiProperty({description:'备注'})
    @prop()
    remarks: string
}

