import { BaseForm } from "Update/ResumeForm/Form";
import { InputGroupWrapper } from "Update/ResumeForm/Form/InputGroup";
import { THEME_COLORS } from "Update/ResumeForm/ThemeForm/constants";
import { InlineInput } from "Update/ResumeForm/ThemeForm/InlineInput";
import {
  DocumentSizeSelections,
  FontFamilySelectionsCSR,
  FontSizeSelections,
} from "Update/ResumeForm/ThemeForm/Selection";
import {
  changeSettings,
  DEFAULT_THEME_COLOR,
  selectSettings,
  type GeneralSetting,
} from "Update/lib/redux/settingsSlice";
import { useAppDispatch, useAppSelector } from "Update/lib/redux/hooks";
import type { FontFamily } from "components/fonts/constants";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { authService } from "components/form/authService";
import { useEffect } from "react";
export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const { fontSize, fontFamily, documentSize } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
  const dispatch = useAppDispatch();
  const resumeid =authService.getResumeId();
  const themeFormwithresumeid ={fontSize:settings.fontSize,fontFamily:settings.fontFamily,documentSize:settings.documentSize,themeColor:themeColor,resumeid:resumeid}; 

const buttonClicked = authService.getbuttonClicked();

  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmit();
    }
  }, [buttonClicked]); 
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/res-set/${resumeid}`, {
        method: 'DELETE',
      });
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression :', error);
  }

    try {
      const response = await fetch("http://localhost:3001/api/v1/res-set/createSkills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(themeFormwithresumeid),
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      const responseData = await response.json();
      console.log("Response data:", responseData);
      console.log("Settings created successfully");
     

    } catch (error) {
      console.error("Error:", error);
    } finally {
    
    }
  };
  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };


  
useEffect(() => {
  const fetchresumeById = async () => {
    try {
      const resume = await fetchResumeById();
      if (resume) {
        const { themeColor, fontSize, fontFamily, documentSize } = resume.Setting[0];

        // Utilisez les bonnes valeurs de champ dans le dispatch de changeSettings
        dispatch(changeSettings({ field: 'themeColor', value: themeColor }));
        dispatch(changeSettings({ field: 'fontSize', value: fontSize }));
        dispatch(changeSettings({ field: 'fontFamily', value: fontFamily }));
        dispatch(changeSettings({ field: 'documentSize', value: documentSize }));
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
  return (
    <BaseForm>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          <h1 className="text-lg font-semibold tracking-wide text-gray-900 ">
            Resume Setting
          </h1>
        </div>
        <div>
          <InlineInput
            label="Theme Color"
            name="themeColor"
            value={settings.themeColor}
            placeholder={DEFAULT_THEME_COLOR}
            onChange={handleSettingsChange}
            inputStyle={{ color: themeColor }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {THEME_COLORS.map((color, idx) => (
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm text-white"
                style={{ backgroundColor: color }}
                key={idx}
                onClick={() => handleSettingsChange("themeColor", color)}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key))
                    handleSettingsChange("themeColor", color);
                }}
                tabIndex={0}
              >
                {settings.themeColor === color ? "✓" : ""}
              </div>
            ))}
          </div>
        </div>
        <div>
          <InputGroupWrapper label="Font Family" />
          <FontFamilySelectionsCSR
            selectedFontFamily={fontFamily}
            themeColor={themeColor}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InlineInput
            label="Font Size (pt)"
            name="fontSize"
            value={fontSize}
            placeholder="11"
            onChange={handleSettingsChange}
          />
          <FontSizeSelections
            fontFamily={fontFamily as FontFamily}
            themeColor={themeColor}
            selectedFontSize={fontSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InputGroupWrapper label="Document Size" />
          <DocumentSizeSelections
            themeColor={themeColor}
            selectedDocumentSize={documentSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </BaseForm>
  );
};
