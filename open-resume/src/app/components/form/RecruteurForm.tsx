"use client";
import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { number, string } from "zod";
import { authService } from "./authService";
import Router from "next/router";
import { useRouter } from "next/navigation";

interface Resume {
  id: number;
  name: string;
}

const Recruteur = () => {
  const router = useRouter();
  const [location, setLocation] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [selectedskillValues, setSelectedskillValues] = useState<any[]>([]);
  const [selectedjobtitleValues, setSelectedjobtitleValues] = useState<any[]>([]);
  const [resumeData, setResumeData] = useState<Resume[]>([]);
  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [showJobtitle, setShowjobtitle] = useState<boolean>(false);
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setLocation(newLocation);  
  };

  const Skillsoptions = [
    { label: 'python', value: 'p' },
    { label: 'java', value: 'j' },
    { label: 'C++', value: 'c' },
    { label: 'React', value: 'React' },
    { label: 'javascript', value: 'j' },
    { label: 'CSS', value: 'C' },
    { label: 'HTML', value: 'HTML' },
    { label: 'Vue.js', value: 'VJ' },
    { label: 'Amazon Web Services (AWS)', value: 'AWS' },
    { label: 'Microsoft Azure', value: 'MA' },
    { label: 'Google Cloud Platform (GCP)', value: 'GCP' },
    { label: 'TensorFlow', value: 'TF' },
    { label: 'PyTorch', value: 'PYT' },
    { label: 'Linux/Unix', value: 'L' },
    { label: 'Windows', value: 'WI' },
    { label: 'Swift (iOS)', value: 'IOS' },
    { label: 'Kotlin (Android)', value: 'KO' },
    { label: 'Flutter', value: 'FU' },
    { label: 'React Native', value: 'RN' }
  ];

  const languagesOptions = [
    { label: 'Arabe', value: 'AR' },
    { label: 'Français', value: 'FR' },
    { label: 'Anglais', value: 'EN' },
    { label: 'Italien', value: 'IT' },
    { label: 'Espagnol', value: 'ES' },
    { label: 'Russe', value: 'RUS' },
    { label: 'Bengali', value: 'BENG' },
    { label: 'Portugais', value: 'PORTUG' },
    { label: 'Chinois', value: 'CHIN' }
  ];

  const jobtitleOptions = [
    { label: 'software engineer', value: 'software engineer' },
    { label: 'Systems Engineer', value: 'SE' },
    { label: 'Database Administrator', value: 'DA' },
    { label: 'Cybersecurity Analyst', value: 'CA' },
    { label: 'Cloud Architect', value: 'CA' },
    { label: 'AI Engineer', value: 'AE' },
    { label: 'Data Analyst', value: 'DA' },
    { label: 'Network Engineer', value: 'NE' },
    { label: 'Technology Consultant', value: 'TC' },
    { label: 'Web Developer', value: 'WD' }
  ];

  const LanguageSearch = async () => {
    try {
      const resumeIdsSet = new Set<number>();

      for (const language of selectedValues) {
        const response = await fetch(`http://localhost:3001/api/v1/language/findLanguage/${language.value}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          data.languages.forEach((language: { resumeid: number }) => {
            if (language.resumeid) {
              resumeIdsSet.add(language.resumeid);
            }
          });
        } else {
          console.error(`Error searching for ${language.value}:`, response.statusText);
        }
      }

      const uniqueResumeIds = Array.from(resumeIdsSet);
      const fetchedResumes: Resume[] = [];

      for (const resumeId of uniqueResumeIds) {
        const response = await fetch(`http://localhost:3001/api/v1/resume/resume/${resumeId}`);
        if (response.ok) {
          const resumeData = await response.json();
          fetchedResumes.push(resumeData);
          console.log("Resume data:", resumeData);
        } else {
          console.error(`Error fetching resume with id ${resumeId}:`, response.statusText);
        }
      }

      setResumeData(fetchedResumes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const SkillsSearch = async () => {
    try {
      const resumeIdsSet = new Set<number>();

      for (const skill of selectedskillValues) {
        const response = await fetch(`http://localhost:3001/api/v1/skills/findSkill/${skill.value}`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          data.forEach((skillData: { resumeid: number; FeaturedSkills: any; descriptions: any; }) => {
            if (skillData.resumeid) {
              resumeIdsSet.add(skillData.resumeid);
            }
          });
        } else {
          console.error(`Error searching for ${skill.value}: ${response.statusText}`);
        }
      }

      const uniqueResumeIds = Array.from(resumeIdsSet);
      const fetchedResumes: Resume[] = [];

      for (const resumeId of uniqueResumeIds) {
        const response = await fetch(`http://localhost:3001/api/v1/resume/resume/${resumeId}`);

        if (response.ok) {
          const resumeData = await response.json();
          fetchedResumes.push(resumeData);
          console.log("Resume data:", resumeData);
        } else {
          console.error(`Error fetching resume with id ${resumeId}: ${response.statusText}`);
        }
      }

      setResumeData(fetchedResumes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const jobtitleSearch = async () => {
    try {
      const resumeIdsSet = new Set<number>();

      for (const jobtitle of selectedjobtitleValues) {
        const response = await fetch(`http://localhost:3001/api/v1/work-exp/findjobTitle/${jobtitle.value}`);
        if (response.ok) {
          const data = await response.json();
          console.log("WorkExp Data for", jobtitle.value, data);
          if (data.workExp) {
            data.workExp.forEach((workExp: { resumeid: number }) => {
              if (workExp.resumeid) {
                resumeIdsSet.add(workExp.resumeid);
              }
            });
          } else {
            console.warn(`No work experiences found for job title ${jobtitle.value}`);
          }
        } else {
          console.error(`Error searching for ${jobtitle.value}:`, response.statusText);
        }
      }

      const uniqueResumeIds = Array.from(resumeIdsSet);
      const fetchedResumes: Resume[] = [];

      for (const resumeId of uniqueResumeIds) {
        const response = await fetch(`http://localhost:3001/api/v1/resume/resume/${resumeId}`);
        if (response.ok) {
          const resumeData = await response.json();
          fetchedResumes.push(resumeData);
          console.log("Resume data:", resumeData);
        } else {
          console.error(`Error fetching resume with id ${resumeId}:`, response.statusText);
        }
      }

      setResumeData(fetchedResumes);
      console.log("Fetched Resumes:", fetchedResumes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const locationSearch = async () => {
    try {
      const resumeIdsSet = new Set<number>();

        const response = await fetch(`http://localhost:3001/api/v1/per-inf/findlocation/${location}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
          data.perInf.forEach((Perinf:{ resumeid: number})=>{
            if (Perinf.resumeid) {
              resumeIdsSet.add(Perinf.resumeid);
            }
          });
        } else {
          console.error(`Error searching for ${location}:`, response.statusText);
        }
      

       const uniqueResumeIds = Array.from(resumeIdsSet);
      const fetchedResumes: Resume[] = [];

      for (const resumeId of uniqueResumeIds) {
        const response = await fetch(`http://localhost:3001/api/v1/resume/resume/${resumeId}`);

        if (response.ok) {
          const resumeData = await response.json();
          fetchedResumes.push(resumeData);
          console.log("Resume data:", resumeData);
        } else {
          console.error(`Error fetching resume with id ${resumeId}:`, response.statusText);
        }
      }

      setResumeData(fetchedResumes);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleViewClick = (resumeId: number) => {
    authService.setResumeId(resumeId);
    authService.setdel(1);
    console.log(resumeId);
    router.push('/Viewresume');
  };

  
  return (
    <div className="flex flex-col md:flex-row">
      <div className="container mx-auto mt-5 md:w-full"> 
        <div className="w-full max-w-4xl flex md:w-3/4"> 
          <div className="flex-1 mr-5">
            <form className="bg-white shadow-md rounded px-6 pt-6 pb-6 mb-6 formulaire-custom">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="languagesHeading">
                    <button className={`accordion-button ${showLanguages ? '' : 'collapsed'}`} type="button" onClick={() => setShowLanguages(!showLanguages)} aria-expanded={showLanguages ? "true" : "false"}>
                      Languages
                    </button>
                  </h2>
                  <div className={`accordion-collapse ${showLanguages ? 'show' : 'collapse'}`} style={{ maxHeight: showLanguages ? '1000px' : '0px', transition: 'max-height 0.2s ease-in-out' }} aria-labelledby="languagesHeading" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <div className="mb-4">
                        <label htmlFor="languages" className="block text-gray-700 font-medium mb-2">
                          Languages
                        </label>
                        <Multiselect
                          options={languagesOptions}
                          selectedValues={selectedValues}
                          onSelect={(selectedList, selectedItem) => setSelectedValues(selectedList)}
                          onRemove={(selectedList, removedItem) => setSelectedValues(selectedList)}
                          displayValue="label"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="locationHeading">
                    <button className={`accordion-button ${showLocation ? '' : 'collapsed'}`} type="button" onClick={() => setShowLocation(!showLocation)} aria-expanded={showLocation ? "true" : "false"}>
                      Location
                    </button>
                  </h2>
                  <div id="locationCollapse" className={`accordion-collapse ${showLocation ? 'show' : 'collapse'}`} aria-labelledby="LocationHeading" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                          Location
                        </label>
                        <input
        id="location"
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={handleLocationChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
      />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="jobtitleHeading">
                    <button className={`accordion-button ${showJobtitle ? '' : 'collapsed'}`} type="button" onClick={() => setShowjobtitle(!showJobtitle)} aria-expanded={showJobtitle ? "true" : "false"}>
                    jobtitle
                    </button>
                  </h2>
                  <div id="jobtitleCollapse" className={`accordion-collapse ${showJobtitle ? 'show' : 'collapse'}`} aria-labelledby="jobtitleHeading" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <div className="mb-6">
                        <label htmlFor="jobtitle" className="block text-gray-700 font-medium mb-2">
                        jobtitle
                        </label>
                        <Multiselect
                          options={jobtitleOptions}
                          selectedValues={selectedjobtitleValues}
                          onSelect={(selectedList, selectedItem) =>  setSelectedjobtitleValues(selectedList)}
                          onRemove={(selectedList, removedItem) =>  setSelectedjobtitleValues(selectedList)}
                          displayValue="label"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                <h2 className="accordion-header" id="SkillsHeading">
                    <button className={`accordion-button ${showLanguages ? '' : 'collapsed'}`} type="button" onClick={() => setShowSkills(!showSkills)} aria-expanded={showSkills? "true" : "false"}>
                    Skills
                    </button>
                  </h2>
                  <div
          id="SkillsCollapse"
          className={`accordion-collapse ${showSkills ? 'show' : 'collapse'}`}
          aria-labelledby="SkillsHeading"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="mb-6">
                        <label htmlFor="Skills" className="block text-gray-700 font-medium mb-2">
                          Skills
                        </label>
                        <Multiselect
                     
                         options={Skillsoptions}
                         selectedValues={selectedskillValues}
                         onSelect={(selectedList, selectedItem) => setSelectedskillValues(selectedList)}
                         onRemove={(selectedList, removedItem) => setSelectedskillValues(selectedList)}
                         displayValue="label"
                       />
                   
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <button
                onClick={() => {
                LanguageSearch();
                  
                locationSearch();
                jobtitleSearch();

                SkillsSearch();
                
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Search
              </button>
            
          </div>
        </div>
      </div>
      <div className="container mt-5">
  <div className="row">
    {resumeData.map((resume, index) => (
      <div className="col-lg-4 mb-2" key={index}>
        <div className="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            alt="Generic placeholder image"
            className="card-img-top img-fluid rounded-top"
            style={{ width: "400px", height: "200px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{resume.name}</h5>
            <p className="card-text">{/* Remplacer "JobTitle" par le titre du poste de travail de ce candidat */}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small text-muted mb-1">Age</p>
                <p className="mb-0">{/* Remplacer "41" par l'âge de ce candidat */}</p>
              </div>
              <div>
                <p className="small text-muted mb-1">Email</p>
                <p className="mb-0"></p>
              </div>
              <div>
                <p className="small text-muted mb-1">Location</p>
                <p className="mb-0">{/* Remplacer "Tabarka" par la localisation de ce candidat */}</p>
              </div>
            </div>
          </div>
              <div className="card-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-primary flex-grow-1 me-1"
                onClick={() => {
                  handleViewClick(resume.id);
                }}
              >
                View
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  );
};
export default Recruteur;
