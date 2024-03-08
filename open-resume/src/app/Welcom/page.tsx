import Welcomepage from "components/form/WelcomForm";
import WelcomepageRoute from "components/form/WelcompageRoute";


export default function Choice() {
  return (
    <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
        <WelcomepageRoute>
      <Welcomepage/></WelcomepageRoute>
    </main>
  );
}