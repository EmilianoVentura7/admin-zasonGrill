// src/components/Modal.js

import React, { useState, useEffect } from "react";

function ActualizarModal({ showModal, closeModal, product, updateProduct }) {
  const [name, setName] = useState(product?.nombre_producto || "");
  const [price, setPrice] = useState(product?.precio || "");
  const [category, setCategory] = useState(product?.categoria || "");

  useEffect(() => {
    if (product) {
      setName(product.nombre_producto);
      setPrice(product.precio);
      setCategory(product.categoria);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      nombre_producto: name,
      precio: price,
      categoria: category,
    };

    updateProduct(updatedProduct);
    closeModal(); // Cerrar el modal después de la actualización
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Actualizar Producto</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre del Producto</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Precio</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Categoría</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-md"
                  required
                >
                  <option value="frituras">Frituras</option>
                  <option value="comidas">Comidas</option>
                  <option value="desayunos">Desayunos</option>
                  <option value="bebidas">Bebidas</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ActualizarModal;
