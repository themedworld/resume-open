import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './entities/education.entity';
import { UpdateEducationDto } from './dto/update-education.dto';
export declare class EducationController {
    private readonly educationService;
    constructor(educationService: EducationService);
    createEducation(createEducationDtoArray: CreateEducationDto[]): Promise<Education[]>;
    updateEducation(id: number, updateEducationDto: UpdateEducationDto): Promise<Education>;
    findEducationByResumeId(id: number): Promise<{
        educations: Education[];
        count: number;
    }>;
    remove(id: string): Promise<void>;
}
