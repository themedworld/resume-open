import { useState, useEffect } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "lib/redux/hooks";
import { ShowForm, selectFormsOrder } from "lib/redux/settingsSlice";
import { ProfileForm } from "Update/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "Update/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "Update/ResumeForm/EducationsForm";
import { ProjectsForm } from "Update/ResumeForm/ProjectsForm";
import { SkillsForm } from "Update/ResumeForm/SkillsForm";
import { ThemeForm } from "Update/ResumeForm/ThemeForm";
import { CustomForm } from "Update/ResumeForm/CustomForm";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { cx } from "lib/cx";
import { LanguageForm } from "Update/ResumeForm/LanguageForm";
import { authService } from "components/form/authService";
import ImportImg from "importimg/page";
const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  languages: LanguageForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();
  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(0); 

  const handleButtonClick = () => {
    setButtonClicked(1); 
  };
console.log (buttonClicked)
authService.setbuttonClicked(buttonClicked);
  return (
    <div
      className={cx(
        "flex justify-center scrollbar scrollbar-track-gray-100 scrollbar-w-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll",
        isHover && "scrollbar-thumb-gray-200"
      )}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <section className="flex max-w-2xl flex-col gap-8 p-[var(--resume-padding)]">
        <ImportImg></ImportImg>
        <ProfileForm />
        {formsOrder.map((form) => {
          const Component = formTypeToComponent[form];
          return <Component key={form} />;
        })}
        <ThemeForm />
        <br />
        <button onClick={handleButtonClick} className="col-span-full bg-blue-500 text-white py-2 px-4 rounded">
          save
        </button>
        
      </section>

      <FlexboxSpacer maxWidth={50} className="hidden md:block" />
    </div>
  );
};

export default ResumeForm;
