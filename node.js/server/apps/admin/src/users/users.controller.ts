import { InjectModel } from 'nestjs-typegoose'
import { User } from '@libs/db/models/user/user.model'
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  Query
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { get } from 'http'
;/定义类型数据传输对象/
class CreatePostDto {
  @ApiProperty({ description: '用户名', example: '用户名1' })
  @IsNotEmpty({ message: '请填写用户名' })
  username: string
  @ApiProperty({ description: '密码', example: '密码231' })
  password: string
}

@Controller('users')
@ApiTags('用户管理')
export class UsersController {
  constructor(@InjectModel(User) private readonly model) {}
  @Get()
  @ApiOperation({ summary: '显示所有用户' })
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
                { email: { $regex: reg } },
                { phone: { $regex: reg } },
                { gender: { $regex: reg } },
                { gradae: { $regex: reg } }
            ]
        }

        if (sort && limit && key) {
            list = await this.model.find(_options)
                .skip((page - 1) * 10)
                .limit(limit)
                .sort({ createdAt: sort })
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

  @Post()
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() createPostDto: CreatePostDto) {
    await this.model.create(createPostDto)
    return {
      success: true
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '用户详情' })
  async detail(@Param('id') id: string) {
    return await this.model.findById(id).select('+password')
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑用户' })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    try {
      if (id === '5e50ebef6727a548b8ceb622')
        return { sucess: true, message: '你不可以修改管理员账户' }
        await this.model.findByIdAndUpdate(id, updatePostDto)
      return {
        message: '修改成功'
      }
    } catch (error) {
      throw new HttpException({ message: '修改失败' }, 500)
    }
  }
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string) {
    try {
      if (id === '5e50ebef6727a548b8ceb622')
        return { sucess: true, message: '你不可以删除管理员账户' }
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
