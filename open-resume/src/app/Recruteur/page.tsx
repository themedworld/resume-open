
import RecruteurRoute from "components/form/RecruteurRoute";
import Recruteur from "components/form/RecruteurForm"
import Layout from "components/layout";
import Navbar from "components/Navbar";

export default function Choice() {
  return (
   
      <RecruteurRoute><Navbar>
        <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12"> 
          <Recruteur />
        </main></Navbar>
      </RecruteurRoute>
 
  );
}
