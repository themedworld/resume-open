"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "./authService";
import styles from "./Welcomepage.module.css";

const Welcomepage = () => {
  const router = useRouter();
  const [username, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = authService.getUserRole();
    setUserRole(role);

    const username = authService.getUserName();
    setUserName(username);
  }, []);

  const logout = () => {
    authService.logOut();
    router.push("/SignIn");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {username && userRole && (
          <>
            <h3 className={styles.title}>Welcome, {username}!</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>Username: {username}</li>
              <li className={styles.listItem}>Role: {userRole}</li>
            </ul>
          </>
        )}
        {userRole === "recruteur" && (
          <button
            className={styles.button}
            onClick={() => router.push("/Recruteur")}
          >
            Go to Recruteur Page
          </button>
        )}
        {userRole === "demandeur" && (
          <button
            className={styles.button}
            onClick={() => router.push("/Demandeur")}
          >
            Go to Demandeur Page
          </button>
        )}
        <div className={styles.logout}>
          <button className={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcomepage;

