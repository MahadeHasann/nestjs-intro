import {  Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { UserSchema } from "src/user/user.model";
import { UserServiceModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStreatigy } from "./local.auth";
import {CacheModule} from "@nestjs/common";
import * as redisStore from 'cache-manager-redis-store';


@Module({
    imports : [CacheModule.register(
        { 
            store: redisStore, 
            host: 'localhost', //default host
            port: 6379 //default port
        }
    ),UserServiceModule , PassportModule , JwtModule.register({
        secret : 'secret',
        signOptions : {expiresIn : '300s' },
    }),MongooseModule.forFeature([{name :'User' , schema : UserSchema}])],
    controllers : [AuthController],
    providers : [AuthService , LocalStreatigy , UserService]
    
})

export class AuthModule{}