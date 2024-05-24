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
import { ResumePDF } from "Update/Resume/ResumePDF";
import axios from "axios";
import { useMemo } from "react";
import { usePDF } from "@react-pdf/renderer";
import { selectResume } from "Update/lib/redux/resumeSlice";
import { selectSettings } from "Update/lib/redux/settingsSlice";
const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  languages: LanguageForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = ({
  imageUrl,

}: {
  imageUrl: string;
 
}) => {


  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  
  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings}  isPDF={true} imageUrl={imageUrl} />,
    [resume, settings,imageUrl]
  );

  const [instance, update] = usePDF({ document });
  useEffect(() => {
    update();
  }, [update, document]);

  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();
  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(0); 

  const handleButtonClick = () => {
    setButtonClicked(1); 
    uploadFileToDatabase();
  };

  const uploadFileToDatabase = async () => {
    const resumeId =authService.getResumeId();
    try {
        const res = await fetch(`http://localhost:3001/api/v1/resumeimage/${resumeId}`, {
          method: 'DELETE',
        });
    } catch (error) {
      console.error('Une erreur est survenue lors de la suppression :', error);
    }
      try {
        
        const fileInfo = {
          fileName: resume.profile.name + " - Resume",
          documentSize: settings.documentSize,
          document: await blobToBase64(instance.url!),
          resumeid: resumeId,
        };
  
  
        const response = await axios.post(
          "http://localhost:3001/api/v1/resumeimage/createResumeimage",
          fileInfo
        );
  console.log("sheeepp")
        if (response.status === 200) {
          console.log("File information uploaded successfully");
        } else {
          console.error("Failed to upload file information");
        }
  
        
      }
      
  
      
      catch (error) {
        console.error("Error uploading file information:", error);
      }
      
    };


    async function blobToBase64(blobUrl: string): Promise<string> {
      const response = await axios.get(blobUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);
      const base64 = buffer.toString('base64');
      return base64;
    }
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
        <ProfileForm />
        {formsOrder.map((form) => {
          const Component = formTypeToComponent[form];
          return <Component key={form} />;
        })}
        <ThemeForm />
        <br />
        <button onClick={handleButtonClick} className="col-span-full bg-blue-500 text-white py-2 px-4 rounded">
          Update
        </button>
        
      </section>

      <FlexboxSpacer maxWidth={50} className="hidden md:block" />
    </div>
  );
};

export default ResumeForm;
