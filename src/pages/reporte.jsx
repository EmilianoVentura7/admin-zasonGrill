import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Reporte() {
  const [page, setCurrentPage] = useState(1);
  const [limit, setItemsPerPage] = useState(5);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Función para cargar los datos desde el backend
    const fetchData = async () => {
      // Obtener el token almacenado en el localStorage
      const token = localStorage.getItem("token");

      // Realizar la solicitud al backend con los parámetros de paginación, límite y token
      const response = await fetch(
        `http://localhost:8080/admin/vendidos?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Datos obtenidos de la base de datos:", data);
      setProductos(data); // Actualizar el estado con los datos del backend
    };

    fetchData();
  }, [page, limit]);

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="h-screen overflow-auto" style={{ backgroundColor: "#242424" }}>
      {/* Navbar */}
      <Navbar />

      <div className="p-4">
        <h2 className="text-2xl font-semibold text-center text-white">
          Tabla de Ventas
        </h2>
        {/* Controles de paginación y límite */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="limit" className="mr-2 text-white">
              Mostrar por página:
            </label>
            <input
              className="rounded"
              type="number"
              id="limit"
              value={limit}
              onChange={(e) => setItemsPerPage(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button
              className={`mx-2 px-4 py-2 rounded ${
                page === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => paginate(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              className={`mx-2 px-4 py-2 rounded ${
                page === Math.ceil(productos.length / limit)
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => paginate(page + 1)}
              disabled={page === Math.ceil(productos.length / limit)}
            >
              Siguiente
            </button>
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-300 rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="py-3 px-4 text-left border border-gray-300">
                Nombre del Producto
              </th>
              <th className="py-3 px-4 text-left border border-gray-300">
                Precio
              </th>
              <th className="py-3 px-4 text-left border border-gray-300">
                Cantidad Vendida
              </th>
              <th className="py-3 px-4 text-left border border-gray-300">
                Precio Total
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.data && productos.data.length > 0 ? (
              productos.data.map((producto, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-100" : "bg-white transition-bg"
                  }
                >
                  <td className="py-3 px-4 border border-gray-300 transition-bg">
                    {producto.nombre_producto}
                  </td>
                  <td className="py-3 px-4 border border-gray-300 transition-bg">
                    {producto.precio}
                  </td>
                  <td className="py-3 px-4 border border-gray-300 transition-bg">
                    {producto.cantidad_total}
                  </td>
                  <td className="py-3 px-4 border border-gray-300 transition-bg">
                    {producto.total_vendido}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 bg-gray-100 transition-bg"
                >
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reporte;
