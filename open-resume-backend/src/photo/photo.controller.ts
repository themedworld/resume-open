import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { UploadedFileService } from "./photo.service";
import { PhotoDto } from "./dto/create-photo.dto";
import { Photo } from './entities/photo.entity';

@Controller("uploaded-files")
export class UploadedFileController {
  constructor(private readonly uploadedFileService: UploadedFileService) {}

  @Post('createPhoto')
  async createPhoto(@Body() photoDto: PhotoDto): Promise<{ photo: Photo }> {
    try {
      const fileBuffer = Buffer.from(photoDto.fileUrl, 'base64'); // Assuming fileUrl contains base64 encoded data
      const photo = await this.uploadedFileService.createPhoto(photoDto, fileBuffer);
      return { photo };
    } catch (error) {
      throw new HttpException(`Failed to create photo: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
