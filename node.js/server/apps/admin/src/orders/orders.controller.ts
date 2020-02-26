import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose/dist/typegoose.decorators';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Order } from '@libs/db/models/order/order.model';

@Controller('orders')
export class OrdersController {
    constructor(
        @InjectModel(Order) private readonly model: ReturnModelType<typeof Order>
      ) {}
}
