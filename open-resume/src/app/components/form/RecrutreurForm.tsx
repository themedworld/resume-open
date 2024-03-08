"use client";
import { useEffect, useState } from "react";
import { authService } from "./authService";

const Recruteur = () => {
    const [username, setUserName] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => { 
        const role = authService.getUserRole();
        setUserRole(role);
        const username = authService.getUserName();
        setUserName(username);
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                    <h1>Hello, {username} - Recruiter</h1>
                    <ul className="list-group">
                        <li className="list-group-item">Username: {username}</li>
                        <li className="list-group-item">Role: {userRole}</li>
                    </ul>
                </div>
            </div>
            <div className="bg-light text-left p-5 font-weight-bold mt-5">
                You are logged in as a Recruiter 'this page will be modifie..'
            </div>
        </div>
    );
}
 
export default Recruteur;
