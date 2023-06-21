import { Body, Controller ,Get,Param,Post ,Patch, UseInterceptors, UploadedFile, Query, UseGuards, Request} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CustomGurd } from "src/auth/auth.gurd";
import { FileService } from "./product.file.save";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController{
    constructor(private readonly productService : ProductService,private readonly fileService : FileService){}

    @Post()
    async createProduct(@Body('title') title : string , @Body('description') desc : string , @Body('price') price : number, @Body('image') image : string){
       return await  this.productService.insertProduct(title,desc,price,image);
    }

    @Get()
    async getProducts(){
        const products = await this.productService.getproducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') id){
        const product = await this.productService.getproduct(id);
        return product;
    }

    @Patch(':id')
    async updateProduct(@Param('id') id , @Body('title') title : string , @Body('description') desc : string , @Body('price') price : number ,@Body('image') image : string){
        const product = await this.productService.updateProduct(id , title, desc , price,image);
        return product;
    }

    @UseGuards(CustomGurd)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file')) // 'file' is the name of the field in the form-data
    async uploadFile(@UploadedFile() file: Express.Multer.File ,@Request() req) {
        console.log(req.user);
        const folderPath = './tempfolder'; // Specify the folder path where you want to save the file
        const savedFilePath = await this.fileService.saveFileToFolder(file, folderPath);
        console.log(`File saved to: ${savedFilePath}`);
        // Handle the uploaded file
        return savedFilePath;
    }

    @Post('check')
    async checkfile(@Query("path") path : string) {
        await this.productService.fileHandle(path);
        return "success";
    }
    

}