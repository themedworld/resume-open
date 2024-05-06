import { Form } from "Update/ResumeForm/Form";
import { BulletListIconButton } from "Update/ResumeForm/Form/IconButton";
import { BulletListTextarea } from "Update/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "Update/lib/redux/hooks";
import { changeCustom, selectCustom } from "Update/lib/redux/resumeSlice";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
} from "Update/lib/redux/settingsSlice";
import { authService } from "components/form/authService"; 
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { descriptions } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const router = useRouter();
  const resumeid = authService.getResumeId(); 
 const Customwithresumeid = {descriptions:custom.descriptions,resumeid:resumeid}
  const handleCustomChange = (field: "descriptions", value: string[]) => {
    dispatch(changeCustom({ field, value }));
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };
  const buttonClicked = authService.getbuttonClicked();
  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmit();
      router.push("/fetchresumebyuserid")
    }
  }, [buttonClicked]); 
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/cus-sec/${resumeid}`, {
        method: 'DELETE',
      });
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression :', error);
  }

    try {
      const response = await fetch("http://localhost:3001/api/v1/cus-sec/create-cus-sec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( Customwithresumeid),
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      const responseData = await response.json();
      console.log("Response data:", responseData);
      console.log("Custumor created successfully");
      

    } catch (error) {
      console.error("Error:", error);
    } finally {
    
    }
  };
  useEffect(() => {
    const fetchresumeById = async () => {
      try {
        const resume = await fetchResumeById();
        if (resume) {
          
          const custom = resume.custom[0];

         
          dispatch(changeCustom({  field: "descriptions", value: [custom.descriptions] }));
     
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
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Custom Textbox"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleCustomChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[7.7rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
      </div>
  
    </Form>
  );
};
