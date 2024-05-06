import { Controller, Post, Body, HttpException, HttpStatus,Delete,Param,Get} from "@nestjs/common";
import { UploadedFileService } from "./photo.service";
import { PhotoDto } from "./dto/create-photo.dto";
import { Photo } from './entities/photo.entity';

@Controller("uploaded-files")
export class UploadedFileController {
  constructor(private readonly uploadedFileService: UploadedFileService) {}

  @Post('createPhoto')
 
  async craetePerInf(@Body() createPhotofDto: PhotoDto): Promise<{Photo: Photo }> {
    const Photo = await this.uploadedFileService.createPhoto(createPhotofDto);
    return { Photo };
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadedFileService.remove(+id);
  }
  @Get(':id')
  async findPerInfByResumeId(@Param('id') id) {
    return this.uploadedFileService.findPerInfByResumeId(parseInt(id));
  }
}
