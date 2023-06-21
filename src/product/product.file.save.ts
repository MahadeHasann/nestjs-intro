import { Injectable } from "@nestjs/common";
import { createWriteStream } from "fs";
import 'moment-timezone';

@Injectable()
export class FileService{

    async saveFileToFolder(file: Express.Multer.File, folderPath: string): Promise<string> {
        var moment = require('moment');
        //moment().tz('UTC')
        var created = moment().format('YYYY-MM-DD hh:mm:ss');

        const filePath =`${folderPath}/${created}_${file.originalname}`;
    
        return new Promise<string>((resolve, reject) => {
          const writeStream = createWriteStream(filePath);
          writeStream.on('finish', () => {
            resolve(filePath);
          });
          writeStream.on('error', (error) => {
            reject(error);
          });
          writeStream.write(file.buffer);
          writeStream.end();
        });
      }
      

}