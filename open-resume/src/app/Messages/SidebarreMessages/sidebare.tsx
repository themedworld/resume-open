"use client";
import classNames from "classnames";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { authService } from "components/form/authService";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
const Sidebar = ({
  onContactChange, 
}: {
  onContactChange: (Contactid: number) => void;
}) => {
  const [username, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [senders, setSenders] = useState<any[]>([]); // State to hold the senders data
  const [selectedSenderId, setSelectedSenderId] = useState<number | null>(senders[0]?.id); // State to hold selected sender ID

  useEffect(() => {
    const role = authService.getUserRole();
    setUserRole(role);

    const username = authService.getUserName();
    setUserName(username);

    const userId = authService.getUserId();
    setUserId(userId);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchContact();
    }
  }, [userId]); // Fetch contact data when userId is set

  const fetchContact = async () => {
    try {
      if (!userId) {
        throw new Error("User ID not available");
      }

      const response = await fetch(`http://localhost:3001/api/v1/message/contactsdem/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contact data");
      }

      const data = await response.json();
      setSenders(data.senders); // Update senders state with fetched data
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  const handleSenderClick = (senderId: number) => {
    setSelectedSenderId(senderId);
    onContactChange(senderId)
    console.log(`Selected sender ID: ${senderId}`);
  };

  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true,
        "bg-blue-500 text-white": true, // Ajout d'une couleur de fond bleue et du texte en blanc
        "md:w-full md:sticky md:top-0 md:z-0 top-0 z-20 fixed": true,
        "md:h-[calc(100vh_-_0px)] h-full w-[200px]": true,
        "transition-transform .3s ease-in-out md:-translate-x-0": true,
        "ml-0": true, // Ajustez la valeur de la marge à gauche selon vos besoins
      })}
    >
      <nav className="md:sticky top-0 md:top-16">
        {/* nav items */}
        <ul>
          {senders.map((sender) => (
            <li
            className={classNames({
              "text-blue-300 hover:bg-green-900": true,
              "flex gap-4 items-center": true,
              "transition-colors duration-300": true,
              "rounded-md p-2 mx-2": true,
              "bg-green-900": selectedSenderId === sender.id, // Apply background color if selected
            })}
            key={sender.id}
            onClick={() => handleSenderClick(sender.id)} // Add onClick handler
          >
            <p>Username: {sender.username}</p>
          </li>
          ))}
        </ul>
      </nav>
      {/* account  */}
      <div className="border-t border-t-indigo-800 p-4">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col ">
            <span className="text-indigo-50 my-0">Hi, {username}</span>
            <Link href="/Demandeur" className="text-indigo-200 text-sm">
            <ArrowLeftIcon className="w-6 h-6 text-black-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

