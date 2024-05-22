"use client";
import { Provider } from "react-redux";
import { store } from "Update/lib/redux/store";
import { ResumeForm } from "Update/ResumeForm";
import { Resume } from "Update/Resume";
import DemandeurRoute1 from "components/form/DemandeurRoute";
import Layout from "components/layout";
import Navbar from "components/Navbar";
import { useState } from "react";
import { ResumeDropzone } from "components/importimg";
export default function Create() {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUrlChange = (newImageUrl: string) => {
    setImageUrl(newImageUrl); // Met à jour l'URL de l'image
  };
  return (
    
    <DemandeurRoute1>
      <Navbar>
      <Provider store={store}>
        <main className="relative h-full w-full overflow-hidden bg-gray-50">
          <div className="grid grid-cols-3 md:grid-cols-6">
            <div className="col-span-3">  <ResumeDropzone onFileUrlChange={setImageUrl}  />
              <ResumeForm />
            </div>
            <div className="col-span-3">
              
              
              <Resume imageUrl={imageUrl}/>
            </div>
          </div>
        </main>
      </Provider></Navbar>
    </DemandeurRoute1>
    
  );
}
