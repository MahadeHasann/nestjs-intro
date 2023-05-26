import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{

    constructor(@InjectModel('User') private readonly UserModule : Model<User>){}

   salt:number = 8;

   async createUser(name : string , email : string , password : string){
    const pass:string  = await bcrypt.hash(password,this.salt);
        const newUser = new this.UserModule({
           name,
           email,
           pass
        })
        const existUser = await this.UserModule.findOne({'email':email})
        if(existUser){
            throw new BadRequestException("user already exist to the system");
        }
        const response = await newUser.save();
        if(response){
            return response.id;
        }
    }

    async getUsers (){
        const resultUsers = await this.UserModule.find();
        console.log(resultUsers);
        return resultUsers.map((res)=>({ id : res.id , name : res.name , email : res.email , password : res.password}));

    }

    async getUser ( id : string){
        let resultUser;
        try{
             resultUser = await this.UserModule.findById(id);
        }catch(error){
            throw new NotFoundException("User not found");
        }
        if(!resultUser){
            throw new NotFoundException("User not found");
        }
        console.log(resultUser);
        return ({id : resultUser.id , name : resultUser.name, email : resultUser.email ,password : resultUser.password })

    }

    async updateUser ( id : string , name : string , email : string , password : string ){
        let oldUser;
        try{
            oldUser = await this.UserModule.findById(id);
        }catch(error){
            throw new NotFoundException("User not found");
        }
        if(!oldUser){
            throw new NotFoundException("User not found");
        }
        if(name){
            oldUser.name = name;
        }
        // if(email){
        //     oldUser.email = email;
        // }
        if(password){
            oldUser.password = password;
        }
        const updatedValude = await oldUser.save();
        return ({id : updatedValude.id , name : updatedValude.name, email : updatedValude.email ,password : updatedValude.password })

    }
    
   async deleteUser ( id : string){
        try{
            await this.UserModule.findByIdAndDelete(id);
            return 'Deleted user successfully';
        }catch(error){
            throw new NotFoundException("User not found");
        }
    }

    async findByEmail(email:string): Promise<User>{
        const findUserByEmail = this.UserModule.findOne({'email':email});
        return findUserByEmail;
    }



}