import { Controller, Get, Body, Post, Param, Put, HttpException, Delete } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose/dist/typegoose.decorators'
import { ReturnModelType } from '@typegoose/typegoose/lib/types'
import { Order } from '@libs/db/models/order/order.model'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@Controller('orders')
@ApiTags('订单管理')
export class OrdersController {
  constructor(
    @InjectModel(Order) private readonly model: ReturnModelType<typeof Order>
  ) {}
  @Get()
  @ApiOperation({ summary: '显示所有订单' })
  async index() {
    return await this.model.find().populate('user').populate('menus').populate('seats')
  }
  @Post()
  @ApiOperation({ summary: '创建订单' })
  async create(@Body() createPostDto) {
    await this.model.create(createPostDto)
    return {
      success: true
    }
  }
  @Get(':id')
  @ApiOperation({ summary: '订单详情' })
  async detail(@Param('id') id: string) {
    return await this.model.findById(id).populate('user').populate('seats')
  }
  @Put(':id')
  @ApiOperation({ summary: '编辑订单' })
  async update(@Param('id') id: string, @Body() updatePostDto) {
    try {
        await this.model.findByIdAndUpdate(id, updatePostDto)
      return {
        message: '修改成功'
      }
    } catch (error) {
      throw new HttpException({ message: '修改失败' }, 500)
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除订单' })
  async remove(@Param('id') id: string,@Body() updatePostDto) {
    try {
      if (updatePostDto.state === '订单完成')
        return { sucess: true, message: '你不可以删除已完成订单' }
      await this.model.findByIdAndDelete(id)
      return {
        sucess: true,
        message: '删除成功'
      }
    } catch (error) {
      throw new HttpException({ message: '删除失败' }, 500)
    }
  }
}
