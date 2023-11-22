import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Navbar from "../components/Navbar";
import Modal from "../components/PedidoModal";
import pedidos from "../img/comida-a-domicilio.png";

function AdminPedidos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [token] = useState(null);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const handleVerPedidoClick = (pedido) => {
    setSelectedPedido(pedido);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/admin/pedidos-pusher",
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.error) {
        console.error("Error del servidor:", responseData.error);
      } else if (
        typeof responseData === "object" &&
        responseData.initialData &&
        Array.isArray(responseData.initialData)
      ) {
        setData(responseData.initialData);
      } else {
        console.error("Los datos iniciales no son un array:", responseData);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    // Obtener token de localStorage al cargar el componente

    const pusher = new Pusher("d43c50bd42af051a68a0", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("canal-pedidos");

    channel.bind("nuevo-pedido", (newData) => {
      fetchData();
      setData((prevData) => [...prevData, newData]);
    });

    fetchData();

    return () => {
      pusher.unsubscribe("canal-pedidos");
    };
  }, [token]);

  return (
    <div className="h-screen overflow-auto" style={{ backgroundColor: "#242424" }}>
      {/* Navbar */}
      <Navbar />

      {/* Contenedor de Pedidos */}
      <div className="p-4">
        <h2 className="text-xl text-center text-white font-semibold mb-4">
          Lista de Pedidos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cards de Pedidos */}
          {data.map((pedido, index) => (
            <div
              key={index}
              className="p-4 rounded shadow shadow-black/100 transition-transform transform-gpu hover:scale-105"
              style={{ backgroundColor: "#424040" }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto">
                <img
                  src={pedidos}
                  alt="Logo de pedidos"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>{" "}
              {/* Imagen del Pedido */}
              <p className="text-white text-center mt-2 text-lg font-semibold">
                Pedido {index + 1}
              </p>
              <button
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => handleVerPedidoClick(pedido)}
              >
                Ver Pedido
              </button>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedPedido && (
        <Modal onClose={handleCloseModal} pedido={selectedPedido} />
      )}
    </div>
  );
}

export default AdminPedidos;
