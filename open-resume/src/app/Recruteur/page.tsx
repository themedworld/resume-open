import RecruteurRoute from "components/form/RecruteurRoute";
import Recruteur from "components/form/RecrutreurForm";
import Layout from "components/layout"

export default function Choice() {
  return (
    <RecruteurRoute>
    <Layout>
    <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
        
      <Recruteur/>
     

    </main>
    </Layout>
     </RecruteurRoute>
  );
}