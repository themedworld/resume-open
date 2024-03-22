import { Hero } from "home/Hero";
import { Steps } from "home/Steps";
import { Features } from "home/Features";
import { Testimonials } from "home/Testimonials";
import { QuestionsAndAnswers } from "home/QuestionsAndAnswers";
import { TopNavBar } from "components/TopNavBar";
import "globals.css";
import { Analytics } from "@vercel/analytics/react";
import DemandeurRoute1 from "components/form/DemandeurRoute";
import Layout from "components/layout";
export default function Demandeur() {
  return (  
    <DemandeurRoute1>
  <Layout>
    
    <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
      <Analytics />
      <Hero />
      <Steps />
      <Features />
      <Testimonials />
      <QuestionsAndAnswers />
     
    </main> 
    </Layout>
    </DemandeurRoute1>
  );
}
