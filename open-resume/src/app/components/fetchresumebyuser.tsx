"use client";
import { useEffect, useState } from "react";
import "./fetch.css";
import { useRouter } from "next/navigation";
import { authService } from "components/form/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Resume {
  id: number;
  name: string;
}

interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

interface Photo {
  fileUrl: string;
  id: number;
  name: string;
  size: string;
}
interface Resumeimage {
  id: number;
  fileName: string;
  documentSize: string;
  document:string; }

interface ResumesWithDetail {
  Photo: Photo;
  ResumeProfile: ResumeProfile;
  resume: Resume;
  Resumeimage:Resumeimage
}

interface ResumeData {
  resumesWithDetails: ResumesWithDetail[];
  count: number;
}

const ResumePage = () => {
  const router = useRouter();
  const handleViewClick = (resumeId: number) => {
    authService.setResumeId(resumeId);
    authService.setdel(1);
    console.log(resumeId);
    router.push('/updatepage');
  };

  const [resumeData, setResumeData] = useState<ResumeData>({ resumesWithDetails: [], count: 0 });
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const id = authService.getUserId();
    const username = authService.getUserName();
    setUserId(id);
    setUserName(username);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3001/api/v1/resume/${userId}/resumes`);
        const data = await response.json();
        setResumeData(data);
        console.log(data)
      };

      fetchData();
    }
  }, [userId]);

  const handleDelete = async (resumeId: number) => {
    try {
      const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce CV ?");
      if (confirmDelete) {
        const response = await fetch(`http://localhost:3001/api/v1/resume/${resumeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const newData = resumeData.resumesWithDetails.filter(
            (resumesWithDetail) => resumesWithDetail.resume.id !== resumeId
          );
          setResumeData({ resumesWithDetails: newData, count: newData.length });
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
      <div className="row mt-4" >
        {resumeData.resumesWithDetails.map((resumesWithDetail, index) => (
          <div className="col-lg-3 mt-6" key={index}>
            <div className="card">
<img
  src={resumesWithDetail.Photo ? "data:image/jpeg;base64," + resumesWithDetail.Photo.fileUrl : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
  alt="Generic placeholder image"
  className="card-img-top img-fluid"
  style={{ borderRadius: "15px 15px 0 0" }}
/>

              <div className="card-body">
                <h5 className="card-title">{resumesWithDetail.resume.name}</h5>
                <p className="card-text"> {resumesWithDetail.ResumeProfile ? resumesWithDetail.ResumeProfile.name : 'N/A'}</p>
                <div className="d-flex justify-content-between align-items-center">
              
                 
                
                  <div>
                    <p className="small text-muted mb-1">location</p>
                    <p className="mb-0">{resumesWithDetail.ResumeProfile ? resumesWithDetail.ResumeProfile.location : 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-outline-primary flex-grow-1 me-1" 
                  onClick={() => handleViewClick(resumesWithDetail.resume.id)}
                >
                  View
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary flex-grow-1" 
                  onClick={() => handleDelete(resumesWithDetail.resume.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <PlusIcon className="plus-icon" />
              <button 
                className="btn btn-primary btn-lg btn-block mt-3"
                onClick={() => router.push("/createnewresume")}
              >
                Create New Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
