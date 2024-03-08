"use client";
import { useRouter } from 'next/navigation';
import { authService } from "./authService";

const DemandeurRoute1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const userRole = authService.getUserRole();

    if (userRole === 'demandeur') {
        return <>{children}</>;
    } else {
        router.push("/SignIn");
        return null;
    }
}

export default DemandeurRoute1;
