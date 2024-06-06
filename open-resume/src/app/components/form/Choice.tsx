import Link from 'next/link';
import Image from 'next/image';
import image1 from './job_seeker_icon.png';
import image2 from './recruiter_icon.png';
import  "./Choice.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
const Choice1 = () => {
    return ( 
        <div className="container mt-5">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h1 className="card-title text-center display-1 text-primary custom-title">Register as:</h1>
                        <div className="text-center">
                          <div style={{ margin: '20px 0' }}>
                            <Link href="/SignUp" passHref>
                              <div className="btn btn-primary btn-lg mb-3 custom-btn">
                                Job Seeker
                                <Image src={image1} alt="Job Seeker" width={100} height={100} />
                              </div>
                            </Link>
                          </div>
                          <div style={{ margin: '20px 0' }}>
                            <Link href="/SignUpr" passHref>
                              <div className="btn btn-primary btn-lg custom-btn">
                                Recruiter
                                <Image src={image2} alt="Recruiter" width={120} height={120} />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

    );
}

export default Choice1;

