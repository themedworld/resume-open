import { View } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";
import { Image } from "@react-pdf/renderer";
import { ResumeDropzone } from "components/importimg";

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
  
  
  return (
    <ResumePDFSection style={{ marginTop: spacing["4"] }}>
          
          <div
  style={{
    width: 150, 
    height: 150, 
    marginBottom: spacing["2"], 
    borderRadius: '50%', 
    border: `5px solid ${themeColor}`, 
    position: 'relative', // Ajouté pour permettre le positionnement absolu des enfants
    overflow: 'hidden' // Pour s'assurer que rien ne dépasse du conteneur circulaire
  }}
>
  <Image
    src={imageUrl}
    style={{
      width: '100%',
      height: '100%', // Ajusté pour s'assurer que l'image couvre entièrement le conteneur
      borderRadius: '50%',
      objectFit: 'cover',
      position: 'absolute', // Positionnement absolu pour superposition
      top: 0,
      left: 0
    }}
  />
  <img  
    src={imageUrl}
    style={{
      width: '100%',
      height: '100%', // Ajusté pour s'assurer que l'image couvre entièrement le conteneur
      borderRadius: '50%',
      objectFit: 'cover',
      position: 'absolute', // Positionnement absolu pour superposition
      top: 0,
      left: 0
    }} 
  />
</div>

       

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