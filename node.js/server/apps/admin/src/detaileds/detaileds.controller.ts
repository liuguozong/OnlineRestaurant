import {
  Controller,
  Post,
  Body,
  HttpException,
  Param,
  Put,
  Delete
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { Detailed } from '@libs/db/models/detailed/detailed.model'

@Controller('detaileds')
@ApiTags('订单详情管理')
export class DetailedsController {
  constructor(
    @InjectModel(Detailed)
    private readonly model: ReturnModelType<typeof Detailed>
  ) {}
  @Post()
  @ApiOperation({ summary: '创建详细订单' })
  async create(@Body() createPostDto) {
    return await this.model.create(createPostDto)
  
  }
  @Put(':id')
  @ApiOperation({ summary: '编辑详细订单' })
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
  @ApiOperation({ summary: '删除详细订单' })
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
}
