"use client";
import { useEffect } from "react";
import { useState } from "react";
import { authService } from "./form/authService";
import { Image } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
const Photo = () => {

    const [imageUrl, setimageUrl] = useState(""); 
    const button1Clicked = authService.getbutton1Clicked();
const resumeid= authService.getResumeId();
    useEffect(() => {
      if (button1Clicked === 1 && resumeid) {
        fetchphotoById();
      }
    }, [button1Clicked]); 

    const fetchphotoById = async () => {
        try {
          const resumeid = authService.getResumeId();
    
          if (!resumeid) {
            throw new Error("Resume ID not available");
          }
    
          const response = await fetch(`http://localhost:3001/api/v1/uploaded-files/${resumeid}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch education data");
          }
    
          const photo = await response.json();
          setimageUrl(photo.fileUrl);
          authService.setfileUrl(photo.fileUrl);

          
    
          
          console.log(photo);
          return photo;
        } catch (error) {
          console.error("Error fetching education data:", error);
          return null;
        }
      };  
 
      console.log(imageUrl);

  return (
    <div>
        <Image src={imageUrl} style={{ width: 100, height: 100, marginBottom: spacing["2"] }} />

    </div>
   
);
};

export default Photo;