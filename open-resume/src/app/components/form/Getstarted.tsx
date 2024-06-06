import React from 'react';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import { Testimonials } from "home/Testimonials";
import Link from 'next/link';
import Image from "next/image";
import image from "./OpenResume.png";
const HomePage: React.FC = () => {
  return (
    <div className={`container-fluid ${styles.container}`}>
  <header className={`text-center p-4 ${styles.header} d-flex flex-column align-items-center`}>
  <div className="text-center mb-4">
    <Image src={image} className={styles.heroImage} style={{ maxWidth: '150px', width: '100%', height: 'auto' }} />
  </div>
  <h1 style={{ width: '100%' }}>Open Resume</h1>
</header>

  
  
      <main className="container py-4">
        <section className={`text-center ${styles.hero}`}>

          <h2 className={styles.heroTitle}>Create Your Perfect Resume</h2>
          <p className={styles.heroDescription}>
            Build a professional resume that highlights your skills and experiences.
          </p>
          <Link legacyBehavior href="/SignIn">
  <a className={`btn btn-primary ${styles.heroButton}`}>
    GET START
  </a>
</Link>
        </section>

        <section className={`mt-5 ${styles.features}`}>
          
        <ul className={`list-unstyled ${styles.featureList}`}>
        <li className="my-2">
        <FontAwesomeIcon 
    icon={faCheckCircle} 
    className="w-6 h-6" 
    style={{ 
      textAlign: 'center', 
      marginBottom: '20px', 
      color: 'blue', 
      animation: 'fadeIn 1s ease-in-out' 
    }} 
  />  Easy-to-use templates
</li>

            <li className="my-2">
  <FontAwesomeIcon 
    icon={faCheckCircle} 
    className="w-6 h-6" 
    style={{ 
      textAlign: 'center', 
      marginBottom: '20px', 
      color: 'blue', 
      animation: 'fadeIn 1s ease-in-out' 
    }} 
  /> 
 Customizable layouts

            </li>
            <li className="my-2">
            <FontAwesomeIcon 
    icon={faCheckCircle} 
    className="w-6 h-6" 
    style={{ 
      textAlign: 'center', 
      marginBottom: '20px', 
      color: 'blue', 
      animation: 'fadeIn 1s ease-in-out' 
    }} 
  /> Professional design
            </li>
            <li className="my-2">
            <FontAwesomeIcon 
    icon={faCheckCircle} 
    className="w-6 h-6" 
    style={{ 
      textAlign: 'center', 
      marginBottom: '20px', 
      color: 'blue', 
      animation: 'fadeIn 1s ease-in-out' 
    }} 
  />  Downloadable PDF format
            </li>
          </ul>
        </section>

        <Testimonials />

        <section className={`text-center mt-5 ${styles.cta}`}>
          <h2>Start Creating Your Resume Today</h2>
          <button className={`btn btn-success ${styles.ctaButton}`}>Get Started</button>
        </section>
      </main>

      <footer className={`text-center p-4 ${styles.footer}`}>
        <p className={styles.copyright}>© 2024 Next.js Page</p>
      </footer>
    </div>
  );
};

export default HomePage;

