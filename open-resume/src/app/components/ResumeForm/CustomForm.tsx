import { Form } from "components/ResumeForm/Form";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import { BulletListTextarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCustom, selectCustom } from "lib/redux/resumeSlice";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
} from "lib/redux/settingsSlice";
import { authService } from "components/form/authService"; // Importez le service d'authentification
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { descriptions } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const router = useRouter();
  const resumeid = authService.getResumeId(); // Récupérer le resumeid du service d'authentification
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
      // Vous pouvez éventuellement effectuer une action supplémentaire ici après la création du profil

    } catch (error) {
      console.error("Error:", error);
    } finally {
    
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
