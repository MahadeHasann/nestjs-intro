import { Body, Controller ,Get,Param,Post ,Patch} from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController{
    constructor(private readonly productService : ProductService){}

    @Post()
    async createProduct(@Body('title') title : string , @Body('description') desc : string , @Body('price') price : number){
       return await  this.productService.insertProduct(title,desc,price);
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
    async updateProduct(@Param('id') id , @Body('title') title : string , @Body('description') desc : string , @Body('price') price : number ){
        const product = await this.productService.updateProduct(id , title, desc , price);
        return product;
    }
    

}