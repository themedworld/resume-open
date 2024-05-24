"use client";
import React, { useState } from "react";
import Sidebar from "./SidebarreMessages/sidebare";
import DemandeurRoute1 from "components/form/DemandeurRoute";
import Navbar from "components/Navbar";
import Discussion from "./discution/discution";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bars3Icon,BarsArrowUpIcon,XCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Sidebarre() {
  const [Contactid, setContactid] = useState(2);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const VerticalBarsIcon = (props:any) => (
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
    
    <DemandeurRoute1>
     
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
      
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-3 bg-zinc-100">
          {/* Sidebar fixe */}

          <div className={`md:col-span-2 lg:col-span-1 bg-white fixed left-0 top-0 bottom-0 z-10 shadow-lg transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ width: '300px' }}>
            <Sidebar onContactChange={setContactid} />
          </div>
          
          {/* Zone de discussion */}
          <div className="md:col-span-4 lg:col-span-4 p-4 overflow-y-auto">
            <Discussion Contactid={Contactid} />
          </div>
      
          <button className="fixed top-4  z-20 bg-gray-200 px-3 py-2 rounded" onClick={toggleSidebar}>
             {sidebarOpen ? (
                <Bars3Icon style={{ color: 'blue' }} className="w-6 h-6"></Bars3Icon>
                
               
              ) : ( <VerticalBarsIcon  style={{ color: 'blue' }} className="w-6 h-6"></VerticalBarsIcon>
                
              )}
        </button>
        </div>
     
     

      </main>
     
    </DemandeurRoute1>
 
  );
}

