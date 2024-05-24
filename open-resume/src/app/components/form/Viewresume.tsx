"use client";
import { authService } from "./authService";
import { useEffect } from "react";
import { useState } from "react";
const Viewresume = () => {
    const resumeid= authService.getResumeId();
    const [url, seturl] = useState<string | null>(null);
    const [Contactid, setContactid] = useState<string | null>(null);
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

      const fetchuser = async () => {
        try {
          const resumeid = authService.getResumeId();
    
          if (!resumeid) {
            throw new Error("Resume ID not available");
          }
    
          const response = await fetch(`http://localhost:3001/api/v1/resume/resume/${resumeid}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
    
          const data= await response.json();
         
          setContactid(data.userId)
    
          
          
          return data;
        } catch (error) {
          console.error("Error fetching education data:", error);
          return null;
        }
      };  
      const handleSendMessage = async () => {
        fetchuser();
       const userId = authService.getUserId();
       try {
          const response = await fetch(
            "http://localhost:3001/api/v1/message/createmessage",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sender: userId,
                receiver: Contactid,
                Message: "I see your resume and I want you for a job",
              }),
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to send message");
          }
    
         
        } catch (error) {
          console.error("Error sending message:", error);
        }
      };
    

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
      onClick={() => handleSendMessage()}
    >
      inviter
    </button>


        </div>
      

    );
}

export default Viewresume;

