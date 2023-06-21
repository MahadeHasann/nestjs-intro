import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: { type: String , require : true},
    description : {type : String , require : true},
    price : {type : Number , require : true},
    image : {type : String , require : false}
});

export interface Product extends mongoose.Document{
        id : string ,
        title : string ,
        description : string ,
        price : Number,
        image : string

}