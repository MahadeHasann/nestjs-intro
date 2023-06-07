import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { CustomGurd } from "src/auth/auth.gurd";
import { AuthModule } from "src/auth/auth.module";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
  imports : [CacheModule.register(),MongooseModule.forFeature([{name : 'User' , schema : UserSchema}])],
  controllers: [UserController],
  providers: [UserService,JwtService],
})
export class UserServiceModule{}