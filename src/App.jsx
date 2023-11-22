import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboard from './pages/AdminDashboard';
import AdminPedidos from './pages/adminPedidos';
import Reporte from './pages/reporte'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-pedidos" element={<AdminPedidos />} />
        <Route path="/admin-reporte" element={<Reporte />} />
      </Routes>
    </Router>
  );
}

export default App;

