import Link from 'next/link';
import Image from 'next/image';
import image from './bgresume.png';


const Getstarted = () => {
    return ( 
<div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url(./bgresume.png)" }}>
      <header className="bg-gray-900 bg-opacity-50">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-4xl text-white font-bold mt-16">
              Open-Resume
            </h1>
            <p className="text-white mt-2">
             create your profectionel resume for free
             </p>
            <div className="flex justify-center mt-8">
            <Link legacyBehavior href="/SignIn">
                <a className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-gray-100 mr-4">
                  GET START
                </a>
              </Link>
              <Link legacyBehavior href="#">
                <a className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  LEARN MORE
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-12">
        {/* Ajoutez ici le contenu principal */}
      </main>
      <footer className="bg-gray-200 py-8">
        <p className="text-center text-gray-600">© 2024 Open-Resume</p>
      </footer>
    </div>
    );
}

export default Getstarted;