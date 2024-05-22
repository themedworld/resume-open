"use client";
import { authService } from "./authService";
import { useEffect } from "react";
import { useState } from "react";
const Viewresume = () => {
    const resumeid= authService.getResumeId();
    const [url, seturl] = useState<string | null>(null);
    const fetchphotoById = async () => {
        try {
          const resumeid = authService.getResumeId();
    
          if (!resumeid) {
            throw new Error("Resume ID not available");
          }
    
          const response = await fetch(`http://localhost:3001/api/v1/resumeimage/${resumeid}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch education data");
          }
    
          const Resumeimage = await response.json();
         
          seturl(Resumeimage.document)
    
          
          
          return Resumeimage;
        } catch (error) {
          console.error("Error fetching education data:", error);
          return null;
        }
      };  
      useEffect(() => {
        fetchphotoById();
      }, []);

    return ( 
        <div>
<iframe
  src={url ? 'data:application/pdf;base64,'+ url : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}

  className="card-img-top img-fluid"
  style={{ 
    borderRadius: "15px 15px 0 0", 
    width: "800px",
    height: "800px"
  }}
/>
<button
      type="button"
      className="btn-primary mr-3"
    
    >
      Contacter
    </button>


        </div>
      

    );
}

export default Viewresume;

