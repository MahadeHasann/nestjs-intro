import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
  imports : [MongooseModule.forFeature([{name : 'User' , schema : UserSchema}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserServiceModule{}