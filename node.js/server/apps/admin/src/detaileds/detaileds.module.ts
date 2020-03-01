import { Module } from '@nestjs/common';
import { DetailedsController } from './detaileds.controller';

@Module({
  controllers: [DetailedsController]
})
export class DetailedsModule {}
