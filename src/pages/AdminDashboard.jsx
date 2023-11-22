import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../img/hamburguesa.png";
import reporte from "../img/guardar-como.png";

function AdminDashboard() {
  const navigateTo = useNavigate();

  return (
    <div className="h-screen" style={{ backgroundColor: "#242424" }}>
      <Navbar />
      <h2 className="text-xl text-center text-white font-semibold mt-4 mb-4">
        Bienvenido al panel de administración
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 my-24">
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

        {/* Card 2 - Reporte */}
        <div
          className="w-2/3 p-4 rounded shadow shadow-black/100 mx-auto transition-transform transform-gpu hover:scale-105"
          style={{ backgroundColor: "#424040" }}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto">
            <img
              src={reporte}
              alt="Logo de reporte"
              className="w-full h-full rounded-full object-cover"
            />
          </div>{" "}
          <p className="text-center text-white mt-2 text-xl font-semibold">
            Reporte
          </p>
          <button
            className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => {
              navigateTo("/admin-reporte");
            }}
          >
            Ir a ver el reporte
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
