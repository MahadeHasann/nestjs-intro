import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{

    constructor(private readonly userService : UserService ,private readonly jwtService : JwtService){}

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
         const payload = {username : user.email , sub : user._id};
         return {
            'access_token': this.jwtService.sign(payload)
         };
    }

}