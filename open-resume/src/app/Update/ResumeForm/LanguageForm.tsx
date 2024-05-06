import { Form, FormSection } from "Update/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "Update/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "Update/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "Update/lib/redux/hooks";
import { selectLanguages, changeLanguages,deleteSectionInFormByIdx } from "Update/lib/redux/resumeSlice";
import type { ResumeLanguage} from "Update/lib/redux/types";
import { authService } from "components/form/authService";
import { selectShowBulletPoints } from "Update/lib/redux/settingsSlice";
import { useEffect,useState } from "react";
import { changeShowBulletPoints } from "Update/lib/redux/settingsSlice";
import { addlanguagesSection } from "Update/lib/redux/resumeSlice";
export const LanguageForm = () => {
  const languages = useAppSelector(selectLanguages);
  const dispatch = useAppDispatch();
  const showDelete = languages.length > 1;
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const resumeid = authService.getResumeId();
  const buttonClicked = authService.getbuttonClicked();
  const [count, setcount] = useState(0);
  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmitLanguage();
    }
  }, [buttonClicked]); 
 
  const handleSubmitLanguage = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/language/${resumeid}`, {
        method: 'DELETE',
      });
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression :', error);
  }
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




  useEffect(() => {
    const fetchresumeById = async () => {
      try {
        const resume = await fetchResumeById();
        if (resume) {
          const languages = resume.languages;
          setcount(languages.length)
          for (let i = 0; i < languages.length; i++) {
            dispatch(addlanguagesSection());
            const language = languages[i];
            dispatch(changeLanguages({ idx: i, field: "language", value: language.language }));
            dispatch(changeLanguages({ idx: i, field: "descriptions", value: [language.descriptions] }));
           
          }
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };
  
    fetchresumeById();
  }, [dispatch]);

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
  const [activationCount, setActivationCount] = useState(0);
  console.log(activationCount);
  
  useEffect(() => {
  
    if (languages.length > count && activationCount < 500) {
      for (let i = languages.length; i > count; i--) {
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
