import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { authService } from "components/form/authService";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";
import { useEffect } from "react";
export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location } = profile;
  const resumeid =authService.getResumeId();
  const profilewithresumeid ={name:profile.name,email:profile.email,phone:profile.phone,url:profile.url,summary:profile.summary,location:profile.location,resumeid:resumeid}; 

const buttonClicked = authService.getbuttonClicked();
  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };
  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmit();
    }
  }, [buttonClicked]); 
  const handleSubmit = async () => {

    try {
      const response = await fetch("http://localhost:3001/api/v1/per-inf/createPerInf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( profilewithresumeid),
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      const responseData = await response.json();
      console.log("Response data:", responseData);
      console.log("Profile created successfully");
      // Vous pouvez éventuellement effectuer une action supplémentaire ici après la création du profil

    } catch (error) {
      console.error("Error:", error);
    } finally {
    
    }
  };


  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Sal Khan"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/khanacademy"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
