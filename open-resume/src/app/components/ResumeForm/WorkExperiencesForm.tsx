import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeWorkExperiences,
  selectWorkExperiences,
} from "lib/redux/resumeSlice";
import type { ResumeWorkExperience } from "lib/redux/types";
import { authService } from "components/form/authService";
import { useEffect } from "react";
import { selectShowBulletPoints } from "lib/redux/settingsSlice";
import { deleteSectionInFormByIdx ,addEducationSection} from "lib/redux/resumeSlice";
import { useState } from "react";
export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();

  const showDelete = workExperiences.length > 1;
  const form = "workExperiences";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const resumeid = authService.getResumeId();
  const buttonClicked = authService.getbuttonClicked();

  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmitProject();
    }
  }, [buttonClicked]); 
  const handleSubmitProject = async () => {
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

  const [activationCount, setActivationCount] = useState(0);
  console.log(activationCount);
useEffect(() => {


            dispatch(changeWorkExperiences({ idx: 0, field: "company", value: "" }));
            dispatch(changeWorkExperiences({ idx: 0, field: "jobTitle", value: "" }));
            dispatch(changeWorkExperiences({ idx: 0, field: "date", value: "" }));
            dispatch(changeWorkExperiences({ idx: 0, field: "descriptions", value: [] }));
  if ( activationCount < 40) {
    for (let i = workExperiences.length; i > 0 ; i--) {
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
