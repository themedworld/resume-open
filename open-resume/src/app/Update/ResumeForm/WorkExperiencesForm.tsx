import { Form, FormSection } from "Update/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "Update/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "Update/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  addWorkExperienceSection,
  changeWorkExperiences,
  selectWorkExperiences,
  deleteSectionInFormByIdx,
} from "Update/lib/redux/resumeSlice";
import type { ResumeWorkExperience } from "lib/redux/types";
import { authService } from "components/form/authService";
import { useEffect,useState } from "react";
import { selectShowBulletPoints } from "Update/lib/redux/settingsSlice";
export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();

  const showDelete = workExperiences.length > 1;
  const form = "workExperiences";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const resumeid = authService.getResumeId();
  const buttonClicked = authService.getbuttonClicked();
  const [count, setcount] = useState(0);
  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmitProject();
    }
  }, [buttonClicked]); 
  const handleSubmitProject = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/work-exp/${resumeid}`, {
        method: 'DELETE',
      });
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression :', error);
  }
    try {
      const updatedworkExperiences = workExperiences.map((workExperience) => {
        return {
          ...workExperience,
          resumeid: resumeid,
        };
      });

      const response = await fetch("http://localhost:3001/api/v1/work-exp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedworkExperiences),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      console.log("Data saved successfully");

   
      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchResumeById = async () => {
    try {
      const resumeid = authService.getResumeId();

      if (!resumeid) {
        throw new Error("Resume ID not available");
      }

      const response = await fetch(`http://localhost:3001/api/v1/resume/UpdateView/${resumeid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch education data");
      }

      const resume = await response.json();
      console.log(resume);
      return resume;
    } catch (error) {
      console.error("Error fetching education data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchresumeById = async () => {
      try {
        const resume = await fetchResumeById();
        if (resume) {
          const WorkExperiences = resume.workExperiences;
          setcount(WorkExperiences.length);
          
          for (let i = 0; i < WorkExperiences.length; i++) {
          
            dispatch(addWorkExperienceSection());
            const WorkExperience = WorkExperiences[i];
            dispatch(changeWorkExperiences({ idx: i, field: "company", value: WorkExperience.company }));
            dispatch(changeWorkExperiences({ idx: i, field: "jobTitle", value: WorkExperience.jobTitle }));
            dispatch(changeWorkExperiences({ idx: i, field: "date", value: WorkExperience.date }));
            dispatch(changeWorkExperiences({ idx: i, field: "descriptions", value: [WorkExperience.descriptions] }));
         
          }
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };
  
    fetchresumeById();
  }, []);

  const [activationCount, setActivationCount] = useState(0);
  console.log(activationCount);
  
  useEffect(() => {
  
    if (workExperiences.length > count && activationCount < 500) {
      for (let i = workExperiences.length; i > count; i--) {
        dispatch(deleteSectionInFormByIdx({ form: "workExperiences", idx: i }));
        setActivationCount(prevCount => prevCount + 1);
      }
      
    }
  }, [activationCount]);
  return (
    <Form form="workExperiences" addButtonText="Add Job">
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        const handleWorkExperienceChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
        ) => {
          // TS doesn't support passing union type to single call signature
          // https://github.com/microsoft/TypeScript/issues/54027
          // any is used here as a workaround
          dispatch(changeWorkExperiences({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== workExperiences.length - 1;

        return (
          <FormSection
            key={idx}
            form="workExperiences"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete job"
          >
            <Input
              label="Company"
              labelClassName="col-span-full"
              name="company"
              placeholder="Khan Academy"
              value={company}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Job Title"
              labelClassName="col-span-4"
              name="jobTitle"
              placeholder="Software Engineer"
              value={jobTitle}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="Jun 2022 - Present"
              value={date}
              onChange={handleWorkExperienceChange}
            />
            <BulletListTextarea
              label="Description"
              labelClassName="col-span-full"
              name="descriptions"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleWorkExperienceChange}
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
