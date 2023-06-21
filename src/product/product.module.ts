import { Controller, Module } from "@nestjs/common";
import { ProductController } from "./product.contoller";
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.model";
import { model } from "mongoose";
import { MulterConfigModule } from "./multer.config.module";
import { FileService } from "./product.file.save";
import { ScheduleModule } from "@nestjs/schedule";
import { SchedulerService } from "./scheduler.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports : [MongooseModule.forFeature([{name : 'Product' , schema : ProductSchema}]),MulterConfigModule,ScheduleModule.forRoot()],
  controllers: [ProductController],
  providers: [ProductService,FileService,SchedulerService,JwtService],
})
export class ProductModule{
}