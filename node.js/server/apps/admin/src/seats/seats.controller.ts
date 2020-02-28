import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  HttpException,
  Post
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
  @ApiOperation({ summary: '显示所有座位' })
  async index() {
    return await this.model.find()
  }
  @Get(':id')
  @ApiOperation({ summary: '座位详情' })
  async detail(@Param('id') id: string) {
    return await this.model.findById(id).select('+password')
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
