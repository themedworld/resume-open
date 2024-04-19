"use client";
import { ResumeDropzone } from "components/importimg";
import DemandeurRoute1 from "components/form/DemandeurRoute";
import Navbar from "components/Navbar";
import { useState } from "react";

export default function ImportImg() {
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  return (
    <DemandeurRoute1>
      
        <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
          <ResumeDropzone
            onFileUrlChange={(fileUrl) => setFileUrl(fileUrl)}
            playgroundView={true}
          />
        </main>

    </DemandeurRoute1>
  );
}
