"use client";
import { useRouter } from 'next/navigation';
import { authService } from './authService';

const WelcomepageRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    if (authService.isLoggedIn()) {
        return <>{children}</>;
    } else {
        router.push('/SignIn');
        return null;
    }
};

export default WelcomepageRoute;
