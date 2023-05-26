import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserServiceModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule,AuthModule,UserServiceModule,MongooseModule.forRoot(
    'mongodb+srv://mahadehasan:P7BkSeUFenjXOpG2@cluster0.ldfwgej.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
