import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../img/bandeja.png";
import ConfirmModal from "./ConfirmModal";

function Navbar() {
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleLogoutConfirmed = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigateTo("/");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <nav
      className="lg:h-20 w-screen p-4 flex justify-between items-center"
      style={{ backgroundColor: "#FF9F0D" }}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-100 rounded-full">
          <img
            src={logo}
            alt="Logo de SazonGrill"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <h1 className="text-ff9f0d ml-2 text-lg font-bold content-center">
          <Link to="/admin-dashboard">
            <span className="text-ff9f0d">SazonGrill</span>
          </Link>
        </h1>
      </div>
      <div className="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 256 256 "
          className="mr-1 cursor-pointer"
          onClick={handleLogout}
        >
          <path
            fill="#ffff"
            d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
          />
        </svg>
      </div>
      {/* Modal de confirmación */}
      {isModalOpen && (
        <ConfirmModal
          message="¿Estás seguro de que quieres cerrar la sesión?"
          onConfirm={handleLogoutConfirmed}
          onCancel={handleModalClose}
        />
      )}
    </nav>
  );
}

export default Navbar;