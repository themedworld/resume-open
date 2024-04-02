"use client"
import { useEffect, useState } from "react";
import "./fetch.css"
import { useRouter } from "next/navigation";
import { authService } from "components/form/authService";
export const useClient = true;
interface Resume {
  id: number;
  name: string;
 
}

interface ResumeData {
  resumes: Resume[];
  count: number;
}

const ResumePage = () => {
  const router = useRouter();

  const [resumeData, setResumeData] = useState<ResumeData>({ resumes: [], count: 0 });
  const [userId, setUserId] = useState<number | null>(null);
  const [username,setUserName]= useState<string | null>(null);
  useEffect(() => {

    const id = authService.getUserId();
    const username = authService.getUserName();
    setUserId(id);
    setUserName(username);
  }, []);

  useEffect(() => {
    if (userId !== null && typeof userId === "number") {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3001/api/v1/resume/${userId}`);
        const data = await response.json();
        setResumeData(data);
      };

      fetchData();
    }
  }, [userId]);

  return (
<div className="container mt-5">
  <div className="text-center">
    <h1 className="card-title text-primary">Resumes</h1>
    <h1 className="display-3">Compte: {username}</h1>
    <h2 className="display-2">You have: {resumeData.count} Resumes</h2>
  </div>
  <div className="row justify-content-center">
    {resumeData.resumes.map((resume, index) => (
      <div className="col-lg-4 mb-4" key={resume.id}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{resume.name}</h5>
            <button type="button" className="btn btn-primary">View</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ResumePage;