import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "components/form/authService";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeEducations, selectEducations } from "lib/redux/resumeSlice";
import type { ResumeEducation } from "lib/redux/types";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "lib/redux/settingsSlice";
import { useState } from "react";
import { ResumeForm } from ".";
import { deleteSectionInFormByIdx ,addEducationSection} from "lib/redux/resumeSlice";
export const EducationsForm = () => {
  const educations = useAppSelector(selectEducations);
  const dispatch = useAppDispatch();
  const showDelete = educations.length > 1;
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const router = useRouter();
  const resumeid = authService.getResumeId();
  const buttonClicked = authService.getbuttonClicked();

  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmitEducation();
    }
  }, [buttonClicked]); // Run the effect whenever buttonClicked changes

  const handleSubmitEducation = async () => {
    try {
      const updatedEducations = educations.map((education) => {
        return {
          ...education,
          resumeid: resumeid,
        };
      });

      const response = await fetch("http://localhost:3001/api/v1/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEducations),
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
  dispatch(changeEducations({ idx: 0, field: "school", value: "" }));
  dispatch(changeEducations({ idx: 0, field: "date", value: "" }));
  dispatch(changeEducations({ idx: 0, field: "descriptions", value: [] }));
  dispatch(changeEducations({ idx: 0, field: "degree", value: "" }));
  dispatch(changeEducations({ idx: 0, field: "gpa", value: "" }));  
  if ( activationCount < 40) {
    for (let i = educations.length; i > 0 ; i--) {
      dispatch(deleteSectionInFormByIdx({ form: "educations", idx: i }));
      setActivationCount(prevCount => prevCount + 1);
    }
    
  }
}, [activationCount]);

  return (
    <Form form={form} addButtonText="Add School">
      {educations.map(({ school, degree, gpa, date, descriptions }, idx) => {
        const handleEducationChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
        ) => {
          dispatch(changeEducations({ idx, field, value } as any));
        };

        const handleShowBulletPoints = (value: boolean) => {
          dispatch(changeShowBulletPoints({ field: form, value }));
        };

        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== educations.length - 1;

        return (
          <FormSection
            key={idx}
            form="educations"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete school"
          >
            <Input
              label="School"
              labelClassName="col-span-4"
              name="school"
              placeholder="Cornell University"
              value={school}
              onChange={handleEducationChange}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="May 2018"
              value={date}
              onChange={handleEducationChange}
            />
            <Input
              label="Degree & Major"
              labelClassName="col-span-4"
              name="degree"
              placeholder="Bachelor of Science in Computer Engineering"
              value={degree}
              onChange={handleEducationChange}
            />
            <Input
              label="GPA"
              labelClassName="col-span-2"
              name="gpa"
              placeholder="3.81"
              value={gpa}
              onChange={handleEducationChange}
            />

            <div className="relative col-span-full">
              <BulletListTextarea
                label="Additional Information (Optional)"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Free paragraph space to list out additional activities, courses, awards etc"
                value={descriptions}
                onChange={handleEducationChange}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[15.6rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </FormSection>
        );
      })}
     
    </Form>
  );
};
