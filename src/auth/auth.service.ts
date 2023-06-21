import {CACHE_MANAGER, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { Cache } from "cache-manager";

@Injectable()
export class AuthService{

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,private readonly userService : UserService ,private readonly jwtService : JwtService){}

    async validateUser (email : string , password : string): Promise<any>{
           const findUser = await this.userService.findByEmail(email);

           if(!findUser){
            return null;
           }
          const passwordValid = bcrypt.compare(password , findUser.password)

          if(findUser && passwordValid){
            return findUser;
          }
          return null;
    }

    async login(user : any){
         const payload = {username : user.username , sub : user._id};
         const jwtToken = this.jwtService.sign(payload);
         //console.log(jwtToken);
         await this.cacheManager.set(jwtToken , true , 60);
         const test = await this.cacheManager.get(jwtToken);
         console.log(test);
         return {
            'access_token': this.jwtService.sign(payload)
         };
    }

}