import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import 'moment-timezone';

@Injectable()
export class SchedulerService {
  //@Cron('0 */5 * * * *')
  @Cron('*/30 * * * * *')
  async handleCron() {
    console.log('Scheduler is running');
    const files = await fs.promises.readdir('./tempfolder');
    //console.log(files);
    
    for (const file of files) {
      const filePath = path.join('./tempfolder', file);
      // Perform your desired operations on the file here
      console.log(`Processing file: ${filePath}`);

      var moment = require('moment');
      var currentTime = moment();
      //currentTime.subtract(1, 'hour');
      currentTime.format('YYYY-MM-DD hh:mm:ss'); 
      const fileTime = filePath.split('/').at(-1).split('_').at(0);
      const formattedTime = moment(fileTime, 'YYYY-MM-DD hh:mm:ss').format("YYYY-MM-DD hh:mm:ss");

      console.log("formated Time: ",formattedTime,"current time : ",currentTime);

      if(formattedTime.isBefore(currentTime)){
        const fileContents = await fs.promises.readFile(filePath, 'utf-8');
        await fs.promises.unlink(filePath);
        console.log("file removed ",filePath);
      }
  }
}
}