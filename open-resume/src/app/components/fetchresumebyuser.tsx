"use client";
import { useEffect, useState } from "react";
import "./fetch.css";
import { useRouter } from "next/navigation";
import { authService } from "components/form/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import image2 from './image.png';
import {PlusIcon,
} from "@heroicons/react/24/outline";
import "./fetch.css";
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
  const handleViewClick = (resumeId : number) => {
    authService.setResumeId(resumeId);
    authService.setdel(1)
    console.log(resumeId)
    router.push('/updatepage');
    
  };

  const [resumeData, setResumeData] = useState<ResumeData>({ resumes: [], count: 0 });
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUserName] = useState<string | null>(null);
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


  const chunkArray = (arr: any[], size: number) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };
  const [confirmDeleteId, setConfirmDeleteId] = useState<number>(0);

  const handleDelete = async (resumeId: number) => {
    try {
      const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce CV ?");
      if (confirmDelete) {
        const response = await fetch(`http://localhost:3001/api/v1/resume/${resumeId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          const newData = resumeData.resumes.filter(resume => resume.id !== resumeId);
          setResumeData({ resumes: newData, count: newData.length });
          console.log('Data deleted successfully');
        } else {
          console.error('La suppression a échoué.');
        }
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la suppression :', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="card-title text-primary">Resumes</h1>
        <h1 className="display-3">Compte: {username}</h1>
        <h2 className="display-2">You have: {resumeData.count} Resumes</h2>
      </div>
      <div className="row mt-4">
        {resumeData.resumes && resumeData.resumes.map((resume, index) => (
          <div className="col-lg-3 mb-4" key={index}>
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                alt="Generic placeholder image"
                className="card-img-top img-fluid"
                style={{ borderRadius: "15px 15px 0 0" }}
              />
              <div className="card-body">
                <h5 className="card-title">{resume.name}</h5>
                <p className="card-text">JobTitle</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="small text-muted mb-1">age</p>
                    <p className="mb-0">41</p>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">email</p>
                    <p className="mb-0">976</p>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">location</p>
                    <p className="mb-0">Tabarka</p>
                  </div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
              <button 
      type="button" 
      className="btn btn-outline-primary flex-grow-1 me-1" 
      onClick={() => handleViewClick(resume.id)}
    >
      View
    </button>
                <button 
  type="button" 
  className="btn btn-primary flex-grow-1" 
  onClick={() => handleDelete(resume.id)}
>
  Delete
</button>
              </div>
            </div>
          </div>
        ))}
        {/* Ajouter un nouveau resume à côté du dernier */}
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-body">
              <PlusIcon className="plus-icon" />
              <button 
              className="btn btn-primary btn-lg btn-block"
               onClick={() => router.push("/createnewresume")}>Create New Resume</button>

            </div>
          </div>
        </div>
      </div>
      
     
    </div> )
    
  };

export default ResumePage;