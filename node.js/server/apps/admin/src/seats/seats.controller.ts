import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  HttpException,
  Post,
  Query
} from '@nestjs/common'
import { Seat } from '@libs/db/models/seat/seat.model'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('seats')
@ApiTags('座位管理')
export class SeatsController {
  constructor(
    @InjectModel(Seat) private readonly model: ReturnModelType<typeof Seat>
  ) {}
  @Get()
  @ApiOperation({ summary: '显示座位' })
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
                { max: { $regex: reg } },
                { state: { $regex: reg } }
            ]
        }

        if (sort && limit && key) {
            list = await this.model.find(_options)
                .skip((page - 1) * 10)
                .limit(limit)
                .sort({ createdAt: sort })
                .populate('coaches')
            count = list.length
            return {
                list,
                count
            }
        }

        if (key) {
            list = await this.model.find(_options)
                .exec()
            count = list.length
            console.log(key, reg, list.length)
            return {
                list,
                count
            }
        }

        if (sort) {
            list = await this.model.find()
                .sort({ createdAt: sort })
            console.log('sort-list:', list)
            return {
                list,
                count
            }
        }

        if (page) {
            list = await this.model.find()
                .skip((page - 1) * 10)
                .limit(limit)
            return {
                list,
                count
            }
        }

        return this.model.find()
  }
  @Get(':id')
  @ApiOperation({ summary: '座位详情' })
  async detail(@Param('id') id: string) {
    const res = await this.model.findById(id).populate('coaches')
    return res
  }
  @Post()
  @ApiOperation({ summary: '创建座位' })
  async create(@Body() createPostDto) {
    await this.model.create(createPostDto)
    return {
      success: true
    }
  }
  @Put(':id')
  @ApiOperation({ summary: '编辑座位' })
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
}
