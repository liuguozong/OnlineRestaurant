import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  HttpException,
  Delete,
  Query
} from '@nestjs/common'
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
  async index(@Query() query) {
    let sort = query.sort || '',
      page = query.page,
      limit = Number(query.limit) || 10,
      key = query.key || '',
      reg = new RegExp(key, 'i'), // 不区分大小写
      count = (await this.model.find()).length,
      list: any = []

    const _options = {
      $or: [
        { name: { $regex: reg } },
        { state: { $regex: reg } },
        { mode: { $regex: reg } }
      ]
    }

    if (sort && limit && key) {
      list = await this.model
        .find(_options)
        .skip((page - 1) * 10)
        .limit(limit)
        .sort({ createdAt: sort })
        .populate('user')
        .populate('menus')
        .populate('seats')
      count = list.length
      return {
        list,
        count
      }
    }

    if (key) {
      list = await this.model
        .find(_options)
        .populate('user')
        .populate('menus')
        .populate('seats')
        .exec()
      count = list.length
      return {
        list,
        count
      }
    }

    if (sort) {
      list = await this.model
        .find()
        .sort({ createdAt: sort })
        .populate('user')
        .populate('menus')
        .populate('seats')
      return {
        list,
        count
      }
    }

    if (page) {
      list = await this.model
        .find()
        .skip((page - 1) * 10)
        .limit(limit)
        .populate('user')
        .populate('menus')
        .populate('seats')
      return {
        list,
        count
      }
    }

    return this.model
      .find()
      .populate('user')
      .populate('menus')
      .populate('seats')
  }
  @Post()
  @ApiOperation({ summary: '创建订单' })
  async create(@Body() createPostDto) {
    const res = await this.model.create(createPostDto)
    return {
      success: true,
      res
    }
  }
  @Get(':id')
  @ApiOperation({ summary: '订单详情' })
  async detail(@Param('id') id: string) {
    const data = await this.model.findById(id).populate('user')
    const detailed = await this.model
      .findById(id)
      .populate('menus')
      .populate('detailed')
      .populate('seats')
    return { data, detailed }
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
  async remove(@Param('id') id: string, @Body() updatePostDto) {
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
  @Put(':id')
  @ApiOperation({ summary: '增加' })
  async increase(@Param('id') id: string, @Body() updatePostDto) {
    try {
      await this.model.findByIdAndUpdate(id, updatePostDto)
      return {
        message: '修改成功'
      }
    } catch (error) {
      throw new HttpException({ message: '修改失败' }, 500)
    }
  }
}
