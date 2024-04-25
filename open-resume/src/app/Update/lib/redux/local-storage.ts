import type { RootState } from "Update/lib/redux/store";
import { authService } from "components/form/authService";
// Reference: https://dev.to/igorovic/simplest-way-to-persist-redux-state-to-localstorage-e67

const LOCAL_STORAGE_KEY = "open-resume-state1";

const fetchresumeById = async () => {
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

export const loadStateFromLocalStorage = () => {
  try {
    
    const stringifiedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stringifiedState) return undefined;
    return JSON.parse(stringifiedState);
  } catch (e) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (state: RootState) => {
  try {
  
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedState);
    console.log(LOCAL_STORAGE_KEY)
  } catch (e) {
    // Ignore
  }
};

export const getHasUsedAppBefore = () => true;
