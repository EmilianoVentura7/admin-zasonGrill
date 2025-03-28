import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/ActualizarModal";
import "../../src/pages/pedidos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/admin/productos`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await response.json();
      console.log("Productos obtenidos:", data);
      setProductos(data.data);
    };

    fetchData();
  }, []);

  const toggleProductStatus = async (productId, currentStatus) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/admin/estado/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deleted: currentStatus === 0 ? 1 : 0,
        }),
      }
    );

    if (response.ok) {
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id_producto === productId
            ? { ...producto, deleted: currentStatus === 0 ? 1 : 0 }
            : producto
        )
      );
    } else {
      alert("Hubo un problema al cambiar el estado del producto.");
    }
  };

  const getProductStatus = (status) => {
    return status === 0 ? "Activado" : "Desactivado";
  };

  const openModal = (producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const updateProduct = async (updatedProduct) => {
    const token = localStorage.getItem("token");
  
    const productDataToUpdate = {
      nombre_producto: updatedProduct.nombre_producto,
      precio: updatedProduct.precio,
      descripcion: updatedProduct.descripcion,
      categoria: updatedProduct.categoria,
    };
  
    try {
      const response = await fetch(
        `http://localhost:8080/admin/producto/${updatedProduct.id_producto}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDataToUpdate),
        }
      );
  
      const responseData = await response.json();
      console.log("Respuesta del servidor: ", responseData);
  
      if (response.ok) {
        setProductos((prevProductos) =>
          prevProductos.map((producto) =>
            producto.id_producto === updatedProduct.id_producto
              ? { ...producto, ...updatedProduct }
              : producto
          )
        );
        alert("Producto actualizado exitosamente.");
      } else {
        alert(`Hubo un problema al actualizar el producto: ${responseData.message || 'Error desconocido'}`);
      }
    } catch (error) {
 
      alert("Hubo un problema al actualizar el producto. Intente nuevamente.");
    }
  };
  

  return (
    <div className="h-screen" style={{ backgroundColor: "#242424" }}>
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Productos Disponibles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos && productos.length > 0 ? (
            productos.map((producto, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {producto.nombre_producto}
                </h3>
                <p className="text-lg text-gray-600 mb-2">
                  <span className="font-semibold">Precio:</span> ${producto.precio}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  <span className="font-semibold">Categoría:</span> {producto.categoria}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Creado el:</span> {producto.created_at}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Estado:</span> {getProductStatus(producto.deleted)}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => openModal(producto)}
                    className="bg-blue-500 text-white p-2 rounded-md"
                  >
                    Editar
                  </button>

                  <label className="switch ml-4">
                    <input
                      type="checkbox"
                      checked={producto.deleted === 0}
                      onChange={() =>
                        toggleProductStatus(producto.id_producto, producto.deleted)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-4 bg-gray-700 text-white">
              No hay productos disponibles.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        product={selectedProduct}
        updateProduct={updateProduct}
      />
    </div>
  );
}

export default Productos;
