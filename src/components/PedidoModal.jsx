import React from "react";

function Modal({ onClose, pedido }) {
  const handlePedidoRealizado = async () => {
    const token = localStorage.getItem("token");

    if (!pedido.detalle_pedido) {
      console.error(
        "La propiedad detalle_pedido no está presente en el pedido."
      );
      return;
    }

    const postPayload = {
      subtotal: pedido.total || 0,
      total: pedido.total || 0,
      idCliente: pedido.id_cliente || 0,
      idPago: pedido.metodo_pago === "Efectivo" ? 1 : 2,
      productos: JSON.parse(pedido.detalle_pedido).map((producto) => ({
        cantidad: producto.cantidad || 0,
        totalProducto: pedido.total || 0,
        idProducto: producto.id || 0,
      })),
    };

    try {
      const postResponse = await fetch("http://localhost:8080/admin/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(postPayload),
      });

      if (postResponse.ok) {
        console.log("Solicitud POST realizada con éxito");

        const deleteResponse = await fetch(
          `http://localhost:8080/admin/pedidos/${pedido.id_pedido}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (deleteResponse.ok) {
          console.log("Pedido marcado como realizado");
          alert("Pedido realizado");
          onClose();
          window.location.reload();
        } else {
          console.error("Error al marcar el pedido como realizado");
          alert("Error al realizar el pedido");
        }
      } else {
        const errorText = await postResponse.text();
        console.error("Error en la solicitud POST:", errorText);
        alert("Error al realizar el pedido. Detalles: " + errorText);
      }
      document.body.style.overflow = "auto";
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red al realizar el pedido");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white p-6 rounded-md w-96 mx-4 my-8 overflow-auto shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Detalle del Pedido</h2>

        {/* Detalles del Pedido */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Pedido</h3>
          <p>
            <span className="font-bold">Cliente:</span> {pedido.nombre}{" "}
            {pedido.apellido}
          </p>
          <p>
            <span className="font-bold">ID pedido:</span> {pedido.id_pedido}
          </p>
          <p>
            <span className="font-bold">ID cliente:</span> {pedido.id_cliente}
          </p>
          <p>
            <span className="font-bold">Dirección:</span> {pedido.ubicación}
          </p>
          <p>
            <span className="font-bold">Teléfono:</span> {pedido.teléfono}
          </p>
          <p>
            <span className="font-bold">Fecha del pedido:</span>{" "}
            {pedido.pedido_fecha}
          </p>
        </div>

        {/* Detalles de Productos */}
        <div className="mb-4 overflow-auto">
          <h3 className="text-lg font-semibold">Productos</h3>
          {pedido.detalle_pedido &&
            JSON.parse(pedido.detalle_pedido).map((producto) => (
              <div key={producto.id} className="mb-2">
                <p className="font-bold">ID del producto: {producto.id}</p>
                <p>Nombre: {producto.nombre}</p>
                <p>Cantidad: {producto.cantidad}</p>
              </div>
            ))}
          <p className="font-bold mt-2">Total: ${pedido.total}</p>
        </div>

        {/* Detalles de Pago */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Método de Pago</h3>
          {pedido && pedido.metodo_pago ? (
            <p>{pedido.metodo_pago}</p>
          ) : (
            <p className="italic">
              No se proporcionó información sobre el método de pago.
            </p>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 mr-2"
            onClick={handlePedidoRealizado}
          >
            Pedido Realizado
          </button>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
