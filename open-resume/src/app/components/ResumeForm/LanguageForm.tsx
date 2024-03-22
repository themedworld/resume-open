import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectLanguages, changeLanguages } from "lib/redux/resumeSlice";
import type { ResumeLanguage} from "lib/redux/types";



export const LanguageForm = () => {
  const languages = useAppSelector(selectLanguages);
  const dispatch = useAppDispatch();
  const showDelete = languages.length > 1;

  return (
    <Form form="languages" addButtonText="Add Language">
      {languages.map(({ language,descriptions }, idx) => {
        const handleLanguageChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeLanguage>
        ) => {
          dispatch(changeLanguages({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== language.length - 1;

        return (
          <FormSection
            key={idx}
            form="languages"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={"Delete language"}
          >
            <Input
              name="language"
              label="Language Name"
              placeholder="OpenResume"
              value={language}
              onChange={handleLanguageChange}
              labelClassName="col-span-4"
            />

            <BulletListTextarea
              name="descriptions"
              label="Description"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleLanguageChange}
              labelClassName="col-span-full"
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
