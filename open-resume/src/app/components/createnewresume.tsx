"use client"
import { useState, useEffect } from "react";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { authService } from "./form/authService";
import { useRouter } from "next/navigation";
interface ResumeData {
  userid: number | null;
  name: string;
}

export const CreateNewResume = () => {
  const [resumeName, setResumeName] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const userId = authService.getUserId();
    if (userId) {
      setUserId(userId);
    }
  }, [authService.getUserId]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ResumeData = { userId, resumeName };
      setIsSaving(true);
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/resume/createresume",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid: ResumeData.userId, name: ResumeData.resumeName }),
          }
        );
    
        if (!response.ok) {
          throw new Error("Failed to create resume");
        }
        
        const resume = await response.json();
        const id = resume.resume.id;
        authService.setResumeId(id);
      const idresume= authService.getResumeId();
    
        console.log("Resume created with ID:", idresume);
        router.push('/resume-builder');
      
        
      } catch (error) {
        console.error("Error:", error);
      }
    };
  

  return (
    <div>
      <form onSubmit={(event) => handleSave(event)}>
        <section className="flex max-w-2xl flex-col gap-8 p-[var(--resume-padding)]">
          <input
            type="text"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            placeholder="Enter resume name"
            className="p-2 border border-gray-300 rounded-md"
          />

          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </section>

        <FlexboxSpacer maxWidth={50} className="hidden md:block" />
      </form>
    </div>
  );
};
export default CreateNewResume;