import { Controller, Get, Post, UseInterceptors, UploadedFile, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


   // 上传文件
   @Post('upload')
   @UseInterceptors(FileInterceptor('file'))
   @ApiOperation({ summary: '上传文件' })
   async uploads(@UploadedFile('file') file) {
       // 上传成功之后，返回一个地址，存入数据库且返回给前端进行显示图片
       try {
           const path = 'http://localhost:3000/uploads/' + file.filename
           console.log(file)
           return path
       } catch (error) {
           throw new HttpException({ message: '上传失败' }, 500)
       }
   }
}
