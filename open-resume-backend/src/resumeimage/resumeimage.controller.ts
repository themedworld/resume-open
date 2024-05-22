import { Controller, Post, Body, HttpException, HttpStatus,Delete,Param,Get} from "@nestjs/common";
import { ResumeimageService } from './resumeimage.service';
import { CreateResumeimageDto } from './dto/create-resumeimage.dto';
import { Resumeimage } from "./entities/resumeimage.entity";

@Controller('resumeimage')
export class ResumeimageController {
  constructor(private readonly resumeimageService: ResumeimageService) {}
  @Post('createResumeimage')
  async craeteResumeimage(@Body() createResumeimageDto: CreateResumeimageDto): Promise<{Resumeimage: Resumeimage }> {
    const Resumeimage = await this.resumeimageService.createResumeimage(createResumeimageDto);
    return { Resumeimage };
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumeimageService.remove(+id);
  }
  @Get(':id')
  async findPerInfByResumeId(@Param('id') id) {
    return this.resumeimageService.findPhotoByResumeId(parseInt(id));
  }




}
