import { Form } from "Update/ResumeForm/Form";
import {
  BulletListTextarea,
  InputGroupWrapper,
} from "Update/ResumeForm/Form/InputGroup";
import { FeaturedSkillInput } from "Update/ResumeForm/Form/FeaturedSkillInput";
import { BulletListIconButton } from "Update/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "Update/lib/redux/hooks";
import { selectSkills, changeSkills } from "Update/lib/redux/resumeSlice";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
  selectThemeColor,
} from "Update/lib/redux/settingsSlice";
import { authService } from "components/form/authService";
import { useEffect } from "react";

export const SkillsForm = () => {
  const skills = useAppSelector(selectSkills);
  const dispatch = useAppDispatch();
  const { featuredSkills, descriptions } = skills;
  const form = "skills";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";
const resumeid= authService.getResumeId();
const skillswithresumeid = {featuredSkills:skills.featuredSkills,descriptions:skills.descriptions,resumeid:resumeid};
const buttonClicked = authService.getbuttonClicked();

useEffect(() => {
  if (buttonClicked === 1 && resumeid) {
    handleSubmit();
  }
}, [buttonClicked]); 
  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (
    idx: number,
    skill: string,
    rating: number
  ) => {
    dispatch(changeSkills({ field: "featuredSkills", idx, skill, rating }));
  };
  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/skills/${resumeid}`, {
        method: 'DELETE',
      });
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression :', error);
  }
    try {
      const response = await fetch("http://localhost:3001/api/v1/skills/createSkills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skillswithresumeid),
      });

      if (!response.ok) {
        throw new Error("Failed to submit skills form");
      }

      console.log("Skills form submitted successfully");
      // Ajoutez ici le code à exécuter après avoir soumis le formulaire avec succès

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchresumeById = async () => {
      try {
        const resume = await fetchResumeById();
        if (resume) {
          
          const skills = resume.skills[0];
          dispatch(changeSkills({  field: "descriptions", value: [skills.descriptions] }));
          for (let i = 0; i < 6; i++) {
            const featuredSkill = skills.featuredSkills[i];
            console.log(featuredSkill.skill)
            dispatch(changeSkills({ field: "featuredSkills", idx: i, skill: featuredSkill.skill, rating: featuredSkill.rating }));
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


  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Skills List"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleSkillsChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[4.5rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
        <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
        <InputGroupWrapper
          label="Featured Skills (Optional)"
          className="col-span-full"
        >
          <p className="mt-2 text-sm font-normal text-gray-600">
            Featured skills is optional to highlight top skills, with more
            circles mean higher proficiency.
          </p>
        </InputGroupWrapper>

        {featuredSkills.map(({ skill, rating }, idx) => (
          <FeaturedSkillInput
            key={idx}
            className="col-span-3"
            skill={skill}
            rating={rating}
            setSkillRating={(newSkill, newRating) => {
              handleFeaturedSkillsChange(idx, newSkill, newRating);
            }}
            placeholder={`Featured Skill ${idx + 1}`}
            circleColor={themeColor}
          />
        ))}

      
      </div>
    </Form>
  );
};
