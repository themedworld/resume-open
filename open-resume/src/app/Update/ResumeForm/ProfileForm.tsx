import { BaseForm } from "Update/ResumeForm/Form";
import { Input, Textarea } from "Update/ResumeForm/Form/InputGroup";
import { authService } from "components/form/authService";
import { useAppDispatch, useAppSelector } from "Update/lib/redux/hooks";
import { changeProfile, selectProfile } from "Update/lib/redux/resumeSlice";
import { ResumeProfile } from "Update/lib/redux/types";
import { useEffect, useState } from "react";
import ImportImg from "importimg/page";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const [namef, setname] = useState("");

  const { name, email, phone, url, summary, location } = profile;

  const resumeid = authService.getResumeId();
  const profilewithresumeid = { ...profile, resumeid: resumeid };

  const buttonClicked = authService.getbuttonClicked();

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  useEffect(() => {
    const fetchresumeById = async () => {
      try {
        const resume = await fetchResumeById();
        if (resume) {
          
          const { name, email, phone, url, summary, location } = resume.ResumeProfile;

         
          dispatch(changeProfile({ field: "name", value: name }));
          dispatch(changeProfile({ field: "email", value: email }));
          dispatch(changeProfile({ field: "phone", value: phone }));
          dispatch(changeProfile({ field: "url", value: url }));
          dispatch(changeProfile({ field: "summary", value: summary }));
          dispatch(changeProfile({ field: "location", value: location }));
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    fetchresumeById();
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/per-inf/createPerInf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profilewithresumeid),
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
    }
  };

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
          onChange={ handleProfileChange}
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
