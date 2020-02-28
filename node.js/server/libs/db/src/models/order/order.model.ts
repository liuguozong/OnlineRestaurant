import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import{User} from '../user/user.model' 
import { Menu } from '../menu/menu.model'
import { Seat } from '../seat/seat.model'
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
    //选的菜品
    @arrayProp({ itemsRef: 'Menu'})
    menus: Ref<Menu>[]
    @arrayProp({ itemsRef: 'Seat'})
    seats: Ref<Seat>[]
    @ApiProperty({description:'评价'})
    @prop()
    evaluate: string
    @ApiProperty({description:'图片'})
    @prop()
    icon: string
    @ApiProperty({description:'味道评分'})
    @prop()
    taste: string
    @ApiProperty({description:'服务评分'})
    @prop()
    service: string
    @ApiProperty({description:'环境评分'})
    @prop()
    surroundings: string
    @ApiProperty({description:'当前状态'})
    @prop()
    state: string
    @ApiProperty({description:'价格'})
    @prop()
    price: string
    @ApiProperty({description:'支付方式'})
    @prop()
    mode: string
    @ApiProperty({description:'备注'})
    @prop()
    remarks: string
}

