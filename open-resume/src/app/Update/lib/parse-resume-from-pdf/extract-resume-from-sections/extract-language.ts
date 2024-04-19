import type { ResumeLanguage } from "lib/redux/types";
import type {
  FeatureSet,
  ResumeSectionToLines,
} from "lib/parse-resume-from-pdf/types";
import { getSectionLinesByKeywords } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import {
  DATE_FEATURE_SETS,
  getHasText,
  isBold,
} from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { divideSectionIntoSubsections } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/subsections";
import { getTextWithHighestFeatureScore } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";
import {
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points";

export const extractLanguage = (sections: ResumeSectionToLines) => {
  const languages: ResumeLanguage[] = [];
  const languagesScores = [];
  const lignes = getSectionLinesByKeywords(sections, ["language"]); // Modification: recherche de la clé "projet"
  const sousSections = divideSectionIntoSubsections(lignes);

  for (const lignesSousSection of sousSections) {
    const idxLignesDescriptions = getDescriptionsLineIdx(lignesSousSection) ?? 1;

    const itemsTexteInfoSousSection = lignesSousSection
      .slice(0, idxLignesDescriptions)
      .flat();
    // Suppression de l'extraction de la date
    const LANGUAGE_FEATURE_SET: FeatureSet[] = [
      [isBold, 2]
      // Suppression de la vérification de la présence de la date
    ];
    const [language, scoresLanguage] = getTextWithHighestFeatureScore(
      itemsTexteInfoSousSection,
      LANGUAGE_FEATURE_SET,
      false
    );

    const lignesDescriptions = lignesSousSection.slice(idxLignesDescriptions);
    const descriptions = getBulletPointsFromLines(lignesDescriptions);

    languages.push({ language, descriptions });
    languagesScores.push({
      scoresLanguage
    });
  }
  return { languages, languagesScores };
};
