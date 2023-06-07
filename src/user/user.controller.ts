import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CustomGurd } from "src/auth/auth.gurd";

@Controller("user")
export class UserController{

    constructor(private readonly userService : UserService){}

    @Post()
    async createUser(@Body('name') name : string , @Body('email') email : string , @Body('password') password : string){
        return this.userService.createUser(name , email , password);
    }

    @Patch(':id')
    async updateUser (@Param('id') id : string ,@Body('name') name : string , @Body('email') email : string , @Body('password') password : string){
       return this.userService.updateUser(id , name, email, password);
    }

    @UseGuards(CustomGurd)
    @Get()
    async getUsers(){
      return this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id : string){
        return this.userService.getUser(id);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id : string){
        return this.userService.deleteUser(id);
    }




}