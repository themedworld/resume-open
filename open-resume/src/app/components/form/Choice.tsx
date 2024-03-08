import Link from 'next/link';
import Image from 'next/image';
import image1 from './job_seeker_icon.png';
import image2 from './recruiter_icon.png';

const Choice1 = () => {
    return ( 
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                        <h1 className="card-title text-center display-1 text-primary">Register as:</h1>
                            <div className="text-center">
                            <br></br><br></br><br></br><br></br>
                                <Link legacyBehavior href="/SignUp">
                                    <a className="btn btn-primary btn-lg mb-3">
                                        <Image src={image1} alt="Job Seeker" width={50} height={50} />
                                        <br />
                                        Job Seeker
                                    </a>
                                </Link>
                                <br />
                                <Link legacyBehavior href="/SignUpr">
                                    <a className="btn btn-primary btn-lg">
                                        <Image src={image2} alt="Recruiter" width={50} height={50} />
                                        <br />
                                        Recruiter
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Choice1;

