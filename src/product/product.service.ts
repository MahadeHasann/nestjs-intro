import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductModule } from "./product.module";
import * as fs from "fs";
import { strict } from "assert";

@Injectable()
export class ProductService{


    constructor(@InjectModel("Product") private readonly ProductModule : Model<Product>){}

       products : Product[]

       async insertProduct(title : string , desc : string , price : number ,image : string) {
        if(image != null && image != ""){
            this.fileHandle(image);
        }
        const newProduct = new this.ProductModule({
            title,
            description : desc,
            price,
            image
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



       async updateProduct( id : string , title : string , description : string , price : number , image : string)  {
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
        if(image != null && image != ""){
           if(!(await this.checkFileExists(image)) && image.startsWith('./upload')){
              await this.fileHandle(image);
              updateProduct.image = image;
              console.log(image);
           }
           if(image.startsWith('./tempfolder')){
            await this.fileHandle(image);
            updateProduct.image = image;
            console.log(image);
         }
        }
        const result = await updateProduct.save();
        return {id :  result.id ,title : result.title, desciption : result.description , price : result.price , image : result.image};
        }catch(error){
            console.log(error)
            throw new NotFoundException('fail to update user');
        }
       }




        async checkFileExists(filePath: string): Promise<boolean> {
          try {
            await fs.accessSync(filePath);
            return true;
          } catch (err) {
            return false;
          }
        }

        async fileHandle(filePath: string): Promise<boolean> {
          //const file = fs.readFileSync(filePath, 'utf-8');
          if(this.checkFileExists(filePath)){
            try{
              //console.log(filePath);
              const fileString  = filePath.split('/');
              //console.log(fileString.at(-1));
              const permanentPath = "./upload";
              const destination = `${permanentPath}/${fileString.at(-1)}`;
              //console.log(destination);
              await this.moveFile(filePath , destination);
              return true;
            }catch(error){
              throw new NotFoundException(error);
            }
          }else{
            throw new NotFoundException('fail to found file path');
          }
        }
        

     async moveFile(sourcePath: string, destinationPath: string): Promise<void> {
          return new Promise((resolve, reject) => {
            fs.rename(sourcePath, destinationPath, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        }

}