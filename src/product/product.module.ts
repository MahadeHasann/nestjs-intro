import { Controller, Module } from "@nestjs/common";
import { ProductController } from "./product.contoller";
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.model";
import { model } from "mongoose";

@Module({
  imports : [MongooseModule.forFeature([{name : 'Product' , schema : ProductSchema}])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule{
}