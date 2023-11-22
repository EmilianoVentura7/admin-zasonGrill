import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white p-6 rounded-md">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 mr-2"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            onClick={onConfirm}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
