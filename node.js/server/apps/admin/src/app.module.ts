import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { MenusModule } from './menus/menus.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '0/common';
import { MulterModule } from '@nestjs/platform-express';
import { OrdersModule } from './orders/orders.module';
import { SeatsModule } from './seats/seats.module';
import { DetailedsModule } from './detaileds/detaileds.module';

@Module({
  imports: [
    MulterModule.register({
        dest:'uploads'
    }),
    CommonModule,
    UsersModule,
    MenusModule,
    AuthModule,
    OrdersModule,
    SeatsModule,
    DetailedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
