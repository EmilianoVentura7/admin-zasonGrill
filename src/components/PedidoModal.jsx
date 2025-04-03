import React, { useState } from "react";

function Modal({ onClose, pedido, onDelete, onUpdateStatus }) {
  if (!pedido) return null; // Si no hay un pedido, no se renderiza el modal.
  
  const statusOptions = ["PENDIENTE", "REALIZADO"];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState(pedido.estado || "PENDIENTE");
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDeleting, setIsDeleting] = useState(false);
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) return; // No hacer nada si el estado es el mismo.
    
    try {
      setIsUpdatingStatus(true);
  
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró token de autenticación');
      }
  
      const tokenTelefono = pedido.token_telefono; // Obtener el token del teléfono del pedido.
      if (!tokenTelefono) {
        throw new Error('No se encontró token del teléfono');
      }
  
      const response = await fetch(`http://localhost:8080/admin/pedidos-status/${pedido.id_pedido}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estatus: newStatus,
          token: tokenTelefono, // Agregar el token del teléfono en la solicitud
        }),
      });
  
      if (response.ok) {
        setStatus(newStatus);
        if (typeof onUpdateStatus === 'function') {
          onUpdateStatus(pedido.id_pedido, newStatus);
        }
        setIsDropdownOpen(false);
        alert(`Estado actualizado a: ${newStatus}`);
      } else {
        const error = await response.text();
        throw new Error(error || 'Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      alert(`Error al actualizar el estado: ${error.message}`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el pedido #${pedido.id_pedido}?`)) {
      try {
        setIsDeleting(true);

        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No se encontró token de autenticación');
        }

        const response = await fetch(`http://localhost:8080/admin/pedidos-eliminar/${pedido.id_pedido}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          alert('Pedido eliminado correctamente');
          if (typeof onDelete === 'function') {
            onDelete(pedido.id_pedido);
          }
          onClose && onClose();
          window.location.reload();
        } else {
          const error = await response.text();
          throw new Error(error || 'Error al eliminar el pedido');
        }
      } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        alert(`Error al eliminar el pedido: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Color según el estado
  const getStatusColor = () => {
    switch (status) {
      case "PENDIENTE": return "bg-yellow-100 text-yellow-800";
      case "EN PROCESO": return "bg-blue-100 text-blue-800";
      case "REALIZADO": return "bg-green-100 text-green-800";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>
        
        <div className="space-y-2">
          <p><strong>ID del Pedido:</strong> {pedido.id_pedido}</p>
          <p><strong>Nombre del Cliente:</strong> {pedido.cliente_nombre} {pedido.cliente_apellido}</p>
          <p><strong>Teléfono del Cliente:</strong> {pedido.cliente_teléfono}</p>
          <p><strong>Fecha del Pedido:</strong> {new Date(pedido.pedido_fecha).toLocaleString()}</p>
          <p><strong>Total:</strong> ${pedido.total}</p>
          <p><strong>Detalles del Pedido:</strong> {pedido.detalle_pedido}</p>
          <p><strong>Token:</strong> {pedido.token_telefono}</p>
          
          <div className="relative">
            <p><strong>Estado:</strong></p>
            <div className="mt-1 relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={isUpdatingStatus || status === "REALIZADO"}
                className={`w-full flex items-center justify-between px-3 py-2 border rounded-md shadow-sm ${getStatusColor()} ${isUpdatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{isUpdatingStatus ? "Actualizando..." : status}</span>
                <svg 
                  className="h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 border">
                  <ul className="max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
                    {statusOptions.map((option) => (
                      <li
                        key={option}
                        className={`${
                          status === option ? "bg-gray-100 font-medium" : ""
                        } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50`}
                        onClick={() => handleStatusChange(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`w-full text-white py-2 px-4 rounded transition-colors ${
              isDeleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
