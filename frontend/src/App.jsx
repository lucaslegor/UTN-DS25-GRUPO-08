import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductCardPage from './pages/ProductCard';
import SolicitudesPage from './pages/SolicitudesPage';
import Layout from './components/Layout';
import { LoginPage } from './pages/Login';
import UserProfile from './pages/UserProfile';
import RegisterPage from './pages/Register';
import AdminPanel from './pages/AdminPanelPage';
import { Contact } from './pages/ContactPage';
import MisPolizasPage from './pages/MisPolizasPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import WhatsAppFloat from './components/WhatsAppFloat';
import { SolicitudesProvider } from './context/SolicitudesContext';

function App() {
  return (
    <SolicitudesProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="nosotros" element={<AboutUs />} />
            <Route path="solicitudes" element={<SolicitudesPage />} />
            <Route path="productcard/:id" element={<ProductCardPage />} />
            <Route path="userProfile" element={<UserProfile/>} />
            <Route path="adminPanel" element={<AdminPanel/>} />
            <Route path="contacto" element={<Contact/>} />
            <Route path="misPolizas" element={<MisPolizasPage/>} />
          </Route>
        </Routes>
        
        <WhatsAppFloat />
      </Router>
    </SolicitudesProvider>
  );
}

export default App;
