import Link from 'next/link';
import Image from 'next/image';
import image1 from './job_seeker_icon.png';
import image2 from './recruiter_icon.png';
import styles from './Choice.module.css';

const Choice1 = () => {
    return (
        <div className={styles.hero}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className={`card ${styles.card}`}>
                            <div className="card-body">
                                <h1 className={`card-title text-center display-1 ${styles.primaryText}`}>Register as:</h1>
                                <div className="text-center">
                                    <div className={styles.imageContainer}>
                                        <img src="https://static.vecteezy.com/ti/vecteur-libre/p2/629164-illustrationle-choix-gratuit-vectoriel.jpg" alt="Decision Arrows" className={styles.heroImage} />
                                        <div className={styles.buttonContainer}>
                                            <Link legacyBehavior href="/SignUp">
                                                <a className={`btn btn-primary btn-lg mb-3 ${styles.button}`}>
                                                    <Image src={image1} alt="Job Seeker" width={50} height={50} />
                                                    <br />
                                                    Job Seeker
                                                </a>
                                            </Link>
                                            <Link legacyBehavior href="/SignUpr">
                                                <a className={`btn btn-primary btn-lg ${styles.button}`}>
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
                </div>
            </div>
        </div>
    );
}

export default Choice1;



