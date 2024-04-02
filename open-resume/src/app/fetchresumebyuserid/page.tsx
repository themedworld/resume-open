import ResumePage from "components/fetchresumebyuser"
import DemandeurRoute1 from "components/form/DemandeurRoute";
import Navbar from "components/Navbar";

export default function Demandeur() {
  return (  
    
    
      <DemandeurRoute1>
        <Navbar>
        <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
         <ResumePage></ResumePage>
        </main> 
        </Navbar>
      </DemandeurRoute1>
    
  );
}
