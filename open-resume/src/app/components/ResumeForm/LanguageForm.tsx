import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectLanguages, changeLanguages } from "lib/redux/resumeSlice";
import type { ResumeLanguage} from "lib/redux/types";
import { authService } from "components/form/authService";
import { selectShowBulletPoints } from "lib/redux/settingsSlice";
import { useEffect } from "react";
import { changeShowBulletPoints } from "lib/redux/settingsSlice";
import { deleteSectionInFormByIdx ,addEducationSection} from "lib/redux/resumeSlice";
import { useState } from "react";
export const LanguageForm = () => {
  const languages = useAppSelector(selectLanguages);
  const dispatch = useAppDispatch();
  const showDelete = languages.length > 1;
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const resumeid = authService.getResumeId();
  const buttonClicked = authService.getbuttonClicked();
  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmitLanguage();
    }
  }, [buttonClicked]); 
 
  const handleSubmitLanguage = async () => {
    try {
      const updatedLanguages = languages.map((language) => {
        return {
          ...language,
          resumeid: resumeid,
        };
      });

      const response = await fetch("http://localhost:3001/api/v1/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLanguages),
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
  }

  const [activationCount, setActivationCount] = useState(0);
  console.log(activationCount);
useEffect(() => {
     dispatch(changeLanguages({ idx: 0, field: "language", value: "" }));
    dispatch(changeLanguages({ idx: 0, field: "descriptions", value: [] }));
  if ( activationCount < 40) {
    for (let i = languages.length; i > 0 ; i--) {
      dispatch(deleteSectionInFormByIdx({ form: "languages", idx: i }));
      setActivationCount(prevCount => prevCount + 1);
    }
    
  }
}, [activationCount]);


  return (
    <Form form="languages" addButtonText="Add Language">
      {languages.map(({ language,descriptions }, idx) => {
        const handleLanguageChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeLanguage>
        ) => {
          dispatch(changeLanguages({ idx, field, value } as any));
        };
        const handleShowBulletPoints = (value: boolean) => {
          dispatch(changeShowBulletPoints({ field: form, value }));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== language.length - 1;

        return (
          <FormSection
            key={idx}
            form="languages"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={"Delete language"}
          >
            <Input
              name="language"
              label="Language Name"
              placeholder="OpenResume"
              value={language}
              onChange={handleLanguageChange}
              labelClassName="col-span-4"
            />

            <BulletListTextarea
              name="descriptions"
              label="Description"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleLanguageChange}
              labelClassName="col-span-full"
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
