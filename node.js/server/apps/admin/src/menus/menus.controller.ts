import { Controller, HttpException, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose'
import { Menu } from '@libs/db/models/menu/menu.model'
import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

  
@Controller('menus')
@ApiTags('菜单管理')
export class MenusController {
  constructor(
    @InjectModel(Menu) private readonly model: ReturnModelType<typeof Menu>
  ) {}
  @Get()
  @ApiOperation({ summary: '显示所有菜品' })
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
                { genre: { $regex: reg } },
                { price: { $regex: reg } }
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
  @ApiOperation({ summary: '创建菜品' })
  async create(@Body() createPostDto) {
    await this.model.create(createPostDto)
    return {
      success: "true",
      message:"创建成功"
    }
  }
  @Get(':id')
  @ApiOperation({ summary: '菜品详情' })
  async detail(@Param('id') id: string) {
    return  await this.model.findById(id)
  }
  @Put(':id')
  @ApiOperation({ summary: '编辑菜品' })
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
  @ApiOperation({ summary: '删除菜品' })
  async remove(@Param('id') id: string) {
    try {
        await this.model.findByIdAndDelete(id)
        return {
          message: '删除成功'
        }
      } catch (error) {
        throw new HttpException({ message: '删除失败' }, 500)
      }
  }
}
