import { View } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "Update/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "Update/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "Update/Resume/ResumePDF/common";
import type { ResumeProfile } from "Update/lib/redux/types";
import { Image } from "@react-pdf/renderer";
import { authService } from "components/form/authService";
import { useState, useEffect } from "react";
export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
  imageUrl,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
  imageUrl:string;
}) => {
  const { name, email, phone, url, summary, location } = profile;
  const iconProps = { email, phone, location, url };
  const [fileUrl, setfileUrl] = useState<string | null>(null);
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
     
      

      
      console.log(photo);
      setfileUrl(photo.fileUrl)
      return photo;
    } catch (error) {
      console.error("Error fetching education data:", error);
      return null;
    }
    
  };  

  useEffect(() => {

    fetchphotoById();
        
      }, []);
  
  return (
    <ResumePDFSection style={{ marginTop: spacing["4"] }}>
          
         
          <View style={{ ...styles.flexRowBetween, alignItems: 'center' }}>  

      <ResumePDFText
        bold={true}
        themeColor={themeColor}
        style={{ fontSize: "20pt" }}
      >
        {name}
      </ResumePDFText>
      {summary && <ResumePDFText>{summary}</ResumePDFText>}

      
      <View
         style={{
           width: 150,
           height: 150,
           borderRadius: '50%',
           border: `5px solid ${themeColor}`,
           overflow: 'hidden',
           marginLeft: spacing["2"],
           position: 'relative'
         }}
       >
         <Image
          

    src={ imageUrl ? imageUrl :   "data:image/jpeg;base64," + fileUrl }
           style={{
             width: '100%',
             height: '100%',
             borderRadius: '50%',
             objectFit: 'cover',
             position: 'absolute',
             top: 0,
             left: 0
           }}
         />
           <img  
     

    src={ imageUrl ? imageUrl :   "data:image/jpeg;base64," + fileUrl }
     style={{
       width: '100%',
       height: '100%', 
       borderRadius: '50%',
       objectFit: 'cover',
       position: 'absolute', 
       top: 0,
       left: 0
     }} 
   />       </View>
    </View>
      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          let iconType = key as IconType;
          if (key === "url") {
            if (value.includes("github")) {
              iconType = "url_github";
            } else if (value.includes("linkedin")) {
              iconType = "url_linkedin";
            }
          }

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = "";
            switch (key) {
              case "email": {
                src = `mailto:${value}`;
                break;
              }
              case "phone": {
                src = `tel:${value.replace(/[^\d+]/g, "")}`; // Keep only + and digits
                break;
              }
              default: {
                src = value.startsWith("http") ? value : `https://${value}`;
              }
            }

            return (
              <ResumePDFLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFLink>
            );
          };

          return (
            <View
              key={key}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
              }}
            >
              <ResumePDFIcon type={iconType} isPDF={isPDF} />
              <Wrapper>
                <ResumePDFText>{value}</ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};