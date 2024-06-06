import { Form, FormSection } from "Update/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "Update/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "Update/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "Update/lib/redux/hooks";
import { selectProjects, changeProjects,deleteSectionInFormByIdx } from "Update/lib/redux/resumeSlice";
import type { ResumeProject } from "Update/lib/redux/types";
import { authService } from "components/form/authService";
import { useEffect,useState } from "react";
import { selectShowBulletPoints } from "Update/lib/redux/settingsSlice";
import { changeShowBulletPoints } from "Update/lib/redux/settingsSlice";
import { addProjectSection } from "Update/lib/redux/resumeSlice";
export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const showDelete = projects.length > 1;
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const resumeid = authService.getResumeId();
  const buttonClicked = authService.getbuttonClicked();
  const [count, setcount] = useState(0);
  const [addSectionExecuted, setAddSectionExecuted] = useState(false);


  useEffect(() => {
    const fetchresumeById = async () => {
      try {
        const resume = await fetchResumeById();
        if (resume) {
          const projects = resume.projects;
          setcount(projects.length);
          if(projects.length>0){
          for (let i = 0; i < projects.length; i++) {
            dispatch(addProjectSection());
            const project = projects[i];
            dispatch(changeProjects({ idx: i, field: "project", value: project.project }));
            dispatch(changeProjects({ idx: i, field: "date", value: project.date }));
            dispatch(changeProjects({ idx: i, field: "descriptions", value: [project.descriptions] }));
            
          }}
          if(projects.length===0){
            dispatch(changeProjects({ idx: 0, field: "project", value: "" }));
            dispatch(changeProjects({ idx: 0, field: "date", value:"" }));
            dispatch(changeProjects({ idx: 0, field: "descriptions", value: [] }));
          }
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };
  
    fetchresumeById();
  }, [dispatch]);
  useEffect(() => {
    if (buttonClicked === 1 && resumeid) {
      handleSubmitProject();
    }
  }, [buttonClicked]); 
  const handleSubmitProject = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/project/${resumeid}`, {
        method: 'DELETE',
      });
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression :', error);
  }
    try {
      const updatedProjects = projects.map((project) => {
        return {
          ...project,
          resumeid: resumeid,
        };
      });

      const response = await fetch("http://localhost:3001/api/v1/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProjects),
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

  const [activationCount, setActivationCount] = useState(0);
  console.log(activationCount);
  
  useEffect(() => {
  
    if (projects.length > count && activationCount < 500) {
      for (let i = projects.length; i > count; i--) {
        dispatch(deleteSectionInFormByIdx({ form: "projects", idx: i }));
        setActivationCount(prevCount => prevCount + 1);
      }
      
    }
  }, [activationCount]);

  return (
    <Form form="projects" addButtonText="Add Project">
      {projects.map(({ project, date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const handleShowBulletPoints = (value: boolean) => {
          dispatch(changeShowBulletPoints({ field: form, value }));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;

        return (
          <FormSection
            key={idx}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={"Delete project"}
          >
            <Input
              name="project"
              label="Project Name"
              placeholder="OpenResume"
              value={project}
              onChange={handleProjectChange}
              labelClassName="col-span-4"
            />
            <Input
              name="date"
              label="Date"
              placeholder="Winter 2022"
              value={date}
              onChange={handleProjectChange}
              labelClassName="col-span-2"
            />
            <BulletListTextarea
              name="descriptions"
              label="Description"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
            
          </FormSection>
        );
      })}
    </Form>
  );
};
