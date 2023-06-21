import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './tempfolder', // Specify the destination directory for storing uploaded files
    }),
  ],
})
export class MulterConfigModule {}
