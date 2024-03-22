import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeLanguage } from "lib/redux/types";

export const ResumePDFLanguage = ({
  heading,
  languages,
  themeColor,
}: {
  heading: string;
  languages: ResumeLanguage[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {languages.map(({ language, descriptions }, idx) => (
        <View key={idx}>
          <View
            style={{
              ...styles.flexRowBetween,
              marginTop: spacing["0.5"],
            }}
          >
            <ResumePDFText bold={true}>{language}</ResumePDFText>
            
          </View>
          <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
            <ResumePDFBulletList items={descriptions} />
          </View>
        </View>
      ))}
    </ResumePDFSection>
  );
};
