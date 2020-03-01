import { Module, Global } from '@nestjs/common'
import { DbService } from './db.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './models/user/user.model'
import { Menu } from './models/menu/menu.model'
import { Order } from './models/order/order.model'
import { Seat } from './models/seat/seat.model'
import { Detailed } from './models/detailed/detailed.model'
const models = TypegooseModule.forFeature([User, Menu, Order,Seat,Detailed]) //引用模型//

@Global() //设置为全局变量
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri:process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      }
    }),
    // TypegooseModule.forRoot(process.env.DB,{
    //    useNewUrlParser: true,
    //    useUnifiedTopology: true,
    //    useCreateIndex: true,
    //    useFindAndModify:false,
    // }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models]
})
export class DbModule {}
