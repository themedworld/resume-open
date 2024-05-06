"use client";
import React, { useState, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { parseResumeFromPdf } from "lib/parse-resume-from-pdf";
import { useRouter } from "next/router";
import addPdfSrc from "public/assets/add-pdf.svg";
import Image from "next/image";
import { cx } from "lib/cx";
import { deepClone } from "lib/deep-clone";
import axios from "axios";
import { authService } from "./form/authService";
import { initialSettings } from "Update/lib/redux/settingsSlice";
const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
};

export const ResumeDropzone = ({
  onFileUrlChange,
  className,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
}) => {
  const [file, setFile] = useState(defaultFileState);
  authService.setfileUrl(file.fileUrl);

  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
  const [fileUrl, setfileUrl] = useState<string>("");
  authService.setfileUrl(fileUrl)

  const resumeId = authService.getResumeId();
  const hasFile = Boolean(file.name);

  const setNewFile = (newFile: File) => {
    if (file.fileUrl) {
      URL.revokeObjectURL(file.fileUrl);
    }

    const { name, size } = newFile;
    const fileUrl = URL.createObjectURL(newFile);

    setFile({ name, size, fileUrl });
    onFileUrlChange(fileUrl);
  };

  const buttonClicked = authService.getbuttonClicked();
  useEffect(() => {
    if (buttonClicked === 1 && resumeId) {
      uploadFileToDatabase();
    }
  }, [buttonClicked]);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    setNewFile(newFile);

    setIsHoveredOnDropzone(false);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFile = files[0];
    setNewFile(newFile);
  };

  const onRemove = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  const uploadFileToDatabase = async () => {
  try {
      const res = await fetch(`http://localhost:3001/api/v1/uploaded-files/${resumeId}`, {
        method: 'DELETE',
      });
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression :', error);
  }
    try {
      const fileInfo = {
        name: file.name,
        size: file.size,
        fileUrl: file.fileUrl,
        resumeid: resumeId,
      };


      const response = await axios.post(
        "http://localhost:3001/api/v1/uploaded-files/createPhoto",
        fileInfo
      );

      if (response.status === 200) {
        console.log("File information uploaded successfully");
      } else {
        console.error("Failed to upload file information");
      }

      
    }

    
    catch (error) {
      console.error("Error uploading file information:", error);
    }
  };

  

  return (
    <div
      className={cx(
        "flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 ",
        isHoveredOnDropzone && "border-sky-400",
        className
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div className="text-center">
        <Image
          src={addPdfSrc}
          className="mx-auto h-14 w-14"
          alt="Add pdf"
          aria-hidden="true"
          priority
        />
        {!hasFile ? (
          <>
            <p
              className={cx(
                "pt-3 text-gray-700",
                "text-lg font-semibold"
              )}
            >
              Browse your file or drop it here
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="pl-7 font-semibold text-gray-900">
              {file.name} - {getFileSizeString(file.size)}
            </div>
            <button
              type="button"
              className="outline-theme-blue rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              title="Remove file"
              onClick={onRemove}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}
        <div className="pt-4">
          {!hasFile ? (
            <>
              <label
                className={cx(
                  "within-outline-theme-purple cursor-pointer rounded-full px-6 pb-2.5 pt-2 font-semibold shadow-sm",
                  "border"
                )}
              >
                Browse file
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="sr-only"
                  onChange={onInputChange}
                />
              </label>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn-primary mr-3"
                onClick={uploadFileToDatabase}
              >
                Upload to Database
              </button>
              <p className={cx(" text-gray-500")}>Note:</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB";
  } else {
    return fileSizeMB.toPrecision(3) + " MB";
  }
};