import { authService } from './../../../components/form/authService';
import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "Update/lib/redux/resumeSlice";
import settingsReducer from "Update/lib/redux/settingsSlice";


export const store = configureStore({
  
  reducer: {
    resume: resumeReducer,
    settings: settingsReducer,
  },
});
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


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
