import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import {
  SwaggerModule,
  DocumentBuilder,
  ApiAcceptedResponse
} from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  // 指定服务框架为express,方便进行静态资源托管
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })
  // 允许跨域请求
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder()
    .setTitle('Nestjs毕设API')
    .setDescription('前台接口')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(3001)
  console.log(`http://localhost:3001/api-docs`)
}
bootstrap()
