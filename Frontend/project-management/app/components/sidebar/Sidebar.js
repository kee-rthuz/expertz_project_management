"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoGridOutline, IoHomeOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item !== 'account') {
      setShowLogout(false);
    }
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    setSelectedItem('account');
    setShowLogout(!showLogout);
  };

  const signout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/login");
      console.log("Logout successful");
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Home', icon: IoHomeOutline, link: '/components/Home' },
    { name: 'Project', icon: IoGridOutline, link: '/components/Project' },
    { name: 'Admin', icon: BiUserCircle, link: '/components/Add' },
  ];

  const getEmailDisplay = () => {
    return email.split('@')[0];
  };

  const getAvatarLetter = () => {
    return email ? email.charAt(0).toUpperCase() : '';
  };

  return (
    <>
      {isMobile && (
        <button onClick={toggleMenu} className="fixed top-4 left-4 z-20 p-2 bg-white rounded-md">
          {isOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
        </button>
      )}
      <div className={`bg-white text-black  h-screen flex flex-col ${isMobile ? 'fixed left-0 top-0 w-64 z-10 transform transition-transform duration-300 ease-in-out' : 'w-52'} ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="p-4">
          <Image src="/hh.png" alt="Logo" width={200} height={200} />
        </div>
        <ul className="flex-grow">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleItemClick(item.name.toLowerCase())}
              className={`p-4 cursor-pointer hover:bg-[#b7ccdc] rounded-3xl mx-3 my-1
              ${selectedItem === item.name.toLowerCase() ? "bg-white" : ""}`}
            >
              <Link href={item.link}>
                <div className="flex items-center">
                  <item.icon className="mr-2 flex justify-center" />
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-4">
          <div 
            onClick={handleAccountClick}
            className="flex items-center cursor-pointer hover:bg-[#b7ccdc] rounded-3xl p-2"
          >
            <div className="mr-2 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
              {getAvatarLetter()}
            </div>
            <span>{getEmailDisplay()}</span>
          </div>
          {showLogout && (
            <div
              onClick={signout}
              className="mt-2 p-2 cursor-pointer hover:bg-[#b7ccdc] rounded-3xl flex items-center"
            >
              <AiOutlineLogout className="mr-2" />
              <span>Logout</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;






