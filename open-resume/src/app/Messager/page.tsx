"use client";
import React, { useState } from "react";
import Navbar from "components/Navbar";
import Sidebar from "./SidebarreMessages/sidebare";
import DemandeurRoute1 from "components/form/DemandeurRoute";
import Discussion from "./discution/discution";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bars3Icon } from "@heroicons/react/24/outline";
import RecruteurRoute from "components/form/RecruteurRoute";

export default function Sidebarre() {
  const [Contactid, setContactid] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const VerticalBarsIcon = (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-bars-3 ${props.className}`}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="5" y1="3" x2="5" y2="21" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="19" y1="3" x2="19" y2="21" />
    </svg>
  );

  return (
    <RecruteurRoute>
      <main className="relative h-screen overflow-hidden bg-gray-50">
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-3 bg-zinc-100">
          
          <div className={`md:col-span-2 lg:col-span-1 bg-white fixed left-0 top-0 bottom-0 z-10 shadow-lg transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ width: '300px' }}>
            <Sidebar onContactChange={setContactid} />
          </div>

          {/* Zone de discussion */}
          <div className="md:col-span-4 lg:col-span-4 p-4 overflow-y-auto">
            {Contactid === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <h1 className="text-4xl font-bold">Open Resume Messenger</h1>
                <h3 className="text-lg">Send and receive messages without having to keep your device connected</h3>
                <h4 className="text-md text-gray-600">Please click on a job seeker contact to see their new messages to you</h4>
              </div>
            ) : (
              <Discussion Contactid={Contactid} />
            )}
          </div>

          <button className="fixed top-4 z-20 bg-gray-200 px-3 py-2 rounded" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <Bars3Icon style={{ color: 'blue' }} className="w-6 h-6" />
            ) : (
              <VerticalBarsIcon style={{ color: 'blue' }} className="w-6 h-6" />
            )}
          </button>
        </div>
      </main>
    </RecruteurRoute>
  );
}

