"use client";
import { useRouter } from 'next/navigation';
import { authService } from "./authService";

const RecruteurRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const userRole = authService.getUserRole();

    if (userRole === 'recruteur') {
        return <>{children}</>;
    } else {
        router.push("/SignIn");
        return null;
    }
}

export default RecruteurRoute;
