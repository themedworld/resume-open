"use client";
import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
interface Resume {
  id: number;
  name: string;
}

const Recruteur = () => {
  const [location, setLocation] = useState<string>("");
  const [workExperiences, setWorkExperiences] = useState<number>(0);
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [resumeData, setResumeData] = useState<Resume[]>([]);
  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [showWorkExperiences, setShowWorkExperiences] = useState<boolean>(false);
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const Skillsoptions = {
    displayValue: 'key',
    groupBy: 'cat',
    onKeyPressFn: () => {},
    onRemove: () => {},
    onSearch: () => {},
    onSelect: () => {},
    options: [
        { cat: 'Programming', key: 'Python' },
        { cat: 'Programming', key: 'Java' },
        { cat: 'Programming', key: 'C++' },
        { cat: 'Web Development', key: 'React' },
        { cat: 'Web Development', key: 'JavaScript' },
        { cat: 'Web Development', key: 'CSS' },
        { cat: 'Web Development', key: 'HTML' },
        { cat: 'Web Development', key: 'Vue.js' },
        { cat: 'Cloud Computing', key: ' Amazon Web Services (AWS)' }, 
        { cat: 'Cloud Computing', key: 'Microsoft Azure' },
        { cat: 'Cloud Computing', key: 'Google Cloud Platform (GCP)' },
        { cat: 'Artificial Intelligence', key: 'TensorFlow' },
        { cat: 'Artificial Intelligence', key: ' PyTorch' },
        { cat: 'Operating Systems', key: 'Linux/Unix' },
        { cat: 'Operating Systems', key: 'Windows' },
        { cat: 'Mobile App Development', key: 'Swift (iOS)' },
        { cat: 'Mobile App Development', key: ' Kotlin (Android)' },
        { cat: 'Mobile App Development', key: 'Flutter' },
        { cat: 'Mobile App Development', key: 'React Native' }
    ],
    showCheckbox: true
};


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

  return (
<div className="container mx-auto flex justify-start mt-5">
      <div className="w-full max-w-xl flex">
        <div className="flex-1 mr-5">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
              <div className="accordion-item">
  <h2 className="accordion-header" id="languagesHeading">
    <button className={`accordion-button ${showLanguages ? '' : 'collapsed'}`} type="button" onClick={() => setShowLanguages(!showLanguages)} aria-expanded={showLanguages ? "true" : "false"}>
      Languages
    </button>
  </h2>
  <div id="languagesCollapse" className={`accordion-collapse ${showLanguages ? 'show' : 'collapse'}`} aria-labelledby="languagesHeading" data-bs-parent="#accordionExample">
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

              </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="locationHeading">
            <button className={`accordion-button ${showLocation ? '' : 'collapsed'}`} type="button" onClick={() => setShowLocation(!showLocation)} aria-expanded={showLocation ? "true" : "false"}>
      location
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
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="workexperiencesHeading">
            <button className={`accordion-button ${showWorkExperiences? '' : 'collapsed'}`} type="button" onClick={() => setShowWorkExperiences(!showWorkExperiences)} aria-expanded={showWorkExperiences ? "true" : "false"}>
            WorkExperiences
    </button>
            </h2>
            <div id="workexperiencesCollapse" className={`accordion-collapse ${showWorkExperiences? 'show' : 'collapse'}`} aria-labelledby="workexperiencesHeading" data-bs-parent="#accordionExample">
               <div className="accordion-body">
                <div className="mb-6">
                  <label htmlFor="workExperiences" className="block text-gray-700 font-medium mb-2">
                    Work Experiences
                  </label>
                  <input
                    id="workExperiences"
                    type="number"
                    placeholder="Enter work experiences demanded"
                    value={workExperiences}
                    onChange={(e) => setWorkExperiences(parseInt(e.target.value))}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="skillsHeading">
            <button className={`accordion-button ${showSkills? '' : 'collapsed'}`} type="button" onClick={() => setShowSkills(!showSkills)} aria-expanded={showSkills ? "true" : "false"}>
            Skills
    </button>
            </h2>
            <div id="SkillsCollapse" className={`accordion-collapse ${showSkills? 'show' : 'collapse'}`} aria-labelledby="SkillsHeading" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                <div className="mb-6">
                  <label htmlFor="Skills" className="block text-gray-700 font-medium mb-2">
                    Skills
                  </label>
                  <Multiselect
                    options={Skillsoptions.options}
                    displayValue={Skillsoptions.displayValue}
                    groupBy={Skillsoptions.groupBy}
                    onKeyPressFn={Skillsoptions.onKeyPressFn}
                    onRemove={Skillsoptions.onRemove}
                    onSearch={Skillsoptions.onSearch}
                    onSelect={Skillsoptions.onSelect}
                    showCheckbox={Skillsoptions.showCheckbox}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button
        onClick={LanguageSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Search
      </button>
    </div>
    <div className="flex-1 ml-5">
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="card-title text-primary">Resumes</h1>
        </div>
        <div className="row justify-content-center">
          {resumeData.map((resume, index) => (
            <div className="col-lg-4 mb-4" key={resume.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{resume.name}</h5>
                  <button type="button" className="btn btn-primary">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default Recruteur;
