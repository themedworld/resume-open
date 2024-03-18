import { Controller, Get, Post, Body, Patch, Param, Delete,Put, ParseIntPipe } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}
  @Post('createLanguage')
  async craeteLanguage(@Body() createLanguageDto: CreateLanguageDto): Promise<{language: Language }> {
    const language = await this.languageService.createLanguage(createLanguageDto);
    return { language };
  }
  @Put(':id')
  async updateLanguage(@Param('id') id: number, @Body() updateLanguageDto: UpdateLanguageDto): Promise<Language> {
    return this.languageService.updateLanguage(id, updateLanguageDto);
  }
  @Get(':id')
  async findLanguageByResumeId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ languages: Language[]; count: number }> {
    const languages = await this.languageService.findLanguageByResumeId(id);
    const count = languages.length;
    return { languages, count };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
