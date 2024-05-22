
import RecruteurRoute from "components/form/RecruteurRoute";
import Layout from "components/layout";
import Navbar from "components/Navbar";
import Viewresume from "components/form/Viewresume";
export default function Viewresume1() {
  return (
   
      <RecruteurRoute><Navbar>
        <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12"> 
          <Viewresume/>
        </main></Navbar>
      </RecruteurRoute>
 
  );
}