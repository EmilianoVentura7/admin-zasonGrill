import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../img/hamburguesa.png";
import productos from "../img/producto.png";
import { useState } from "react";

function AdminDashboard() {
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No estás autorizado. Por favor, inicia sesión.");
      return;
    }

    const productData = new FormData();
    productData.append("nombre_producto", productName);
    productData.append("precio", price);
    productData.append("descripcion", description);
    productData.append("categoria", category);
    if (image) {
      productData.append("imagen", image);
    }

    try {
      const response = await fetch("http://localhost:8080/admin/agregar-productos", {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
        },
        body: productData,
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto");
      }

      // Si la respuesta es exitosa, cierra el modal y limpia el formulario
      alert("Producto agregado exitosamente");
      closeModal();
      setProductName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage(null);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="h-screen" style={{ backgroundColor: "#242424" }}>
      <Navbar />
      <h2 className="text-xl text-center text-white font-semibold mt-4 mb-4">
        Bienvenido al panel de administración
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 my-24">
        {/* Card 1 - Ver Pedidos */}
        <div
          className="w-2/3 p-4 rounded shadow shadow-black/100 mx-auto transition-transform transform-gpu hover:scale-105"
          style={{ backgroundColor: "#424040" }}
        >
          <div className="w-16 h-16 mx-auto relative bg-blue-100 rounded-full">
            <img
              src={logo}
              alt="Logo de SazonGrill"
              className="w-full h-full rounded-full object-cover"
            />
          </div>{" "}
          {/* Icon */}
          <p className="text-center text-white mt-2 text-xl font-semibold">
            Ver Pedidos
          </p>
          <button
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => {
              navigateTo("/admin-pedidos");
            }}
          >
            Ir a Ver Pedidos
          </button>
        </div>

        {/* Card 2 - Productos */}
        <div
          className="w-2/3 p-4 rounded shadow shadow-black/100 mx-auto transition-transform transform-gpu hover:scale-105"
          style={{ backgroundColor: "#424040" }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto">
            <img
              src={productos}
              alt="Logo de productos"
              className="w-full h-full rounded-full object-cover"
            />
          </div>{" "}
          <p className="text-center text-white mt-2 text-xl font-semibold">
            Productos
          </p>
          <button
            className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
            onClick={() => {
              navigateTo("/admin-productos");
            }}
          >
            Ir a Ver Productos
          </button>
        </div>

        {/* Card 3 - Agregar Producto */}
        <div
          className="w-2/3 p-4 rounded shadow shadow-black/100 mx-auto transition-transform transform-gpu hover:scale-105"
          style={{ backgroundColor: "#424040" }}
        >
          <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto">
            <img
              src={productos}
              alt="Logo de agregar productos"
              className="w-full h-full rounded-full object-cover"
            />
          </div>{" "}
          <p className="text-center text-white mt-2 text-xl font-semibold">
            Agregar Producto
          </p>
          <button
            className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-300"
            onClick={openModal}
          >
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-96">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Agregar Producto
            </h2>
            <form className="space-y-4" onSubmit={handleAddProduct}>
              <div>
                <label className="block text-lg text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Nombre del producto"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-lg text-gray-700">Precio</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-lg text-gray-700">Descripción</label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Descripción del producto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="block text-lg text-gray-700">Categoría</label>
                <select
                  className="w-full p-2 border rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="comidas">Comidas</option>
                  <option value="desayunos">Desayunos</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="frituras">Frutas</option>
                </select>
              </div>
              <div>
                <label className="block text-lg text-gray-700">Imagen (opcional)</label>
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
