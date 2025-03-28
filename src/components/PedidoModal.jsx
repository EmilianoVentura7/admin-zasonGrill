import React from "react";

function Modal({ onClose, pedido }) {
  if (!pedido) return null; // Si no hay un pedido, no se renderiza el modal.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>
        <p><strong>ID del Pedido:</strong> {pedido.id_pedido}</p>
        <p><strong>Nombre del Cliente:</strong> {pedido.cliente_nombre} {pedido.cliente_apellido}</p>
        <p><strong>Teléfono del Cliente:</strong> {pedido.cliente_teléfono}</p>
        <p><strong>Fecha del Pedido:</strong> {new Date(pedido.pedido_fecha).toLocaleString()}</p>
        <p><strong>Total:</strong> ${pedido.total}</p>
        <p><strong>Detalles del Pedido:</strong> {pedido.detalle_pedido}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
