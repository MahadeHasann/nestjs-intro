import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductModule } from "./product.module";

@Injectable()
export class ProductService{


    constructor(@InjectModel("Product") private readonly ProductModule : Model<Product>){}

       products : Product[]

       async insertProduct(title : string , desc : string , price : number ) {
        const newProduct = new this.ProductModule({
            title,
            description : desc,
            price
        })
        const result = await newProduct.save();
        console.log(result)
           return result.id as string;
       }

       async getproducts()  {
        const products = await this.ProductModule.find();
        return products.map((prod)=> ({ id : prod.id , title : prod.title , description : prod.description , price : prod.price }));
       }

       async getproduct( id : string)  {
        try{
        const product = await this.ProductModule.findById(id);
        return {id : product.id ,title : product.title, desciption : product.description , price : product.price };
        }catch(error){
            throw new NotFoundException('Not found the data');
        }
       }

       async updateProduct( id : string , title : string , description : string , price : number)  {
        try{
        const updateProduct = await this.ProductModule.findById(id);

        if(title){
            updateProduct.title = title;
        }

        if(description){
            updateProduct.description = description;

        }
        if(price){
            updateProduct.price = price;

        }

        const result = await updateProduct.save();

        return {id :  result.id ,title : result.title, desciption : result.description , price : result.price };
        }catch(error){
            console.log(error)
            throw new NotFoundException('fail to update user');
        }
       }

}