import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboard from './pages/AdminDashboard';
import AdminPedidos from './pages/adminPedidos';
import Productos from './pages/productos'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-pedidos" element={<AdminPedidos />} />
        <Route path="/admin-productos" element={<Productos />} />
      </Routes>
    </Router>
  );
}

export default App;

