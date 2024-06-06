import { Controller, Post, Body, HttpException, HttpStatus,Delete,Param,Get,Put} from "@nestjs/common";
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
  @Put(':id')
  async updateimageresume(@Param('id') id: number, @Body()createResumeimageDto:CreateResumeimageDto ): Promise<Resumeimage> {
    return this.resumeimageService.updateimage(id, createResumeimageDto);
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
