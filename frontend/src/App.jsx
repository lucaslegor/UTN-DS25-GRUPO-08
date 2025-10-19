import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductCardPage from './pages/ProductCard';
import CartPage from './pages/CartPage';
import Layout from './components/Layout';
import { LoginPage } from './pages/Login';
import UserProfile from './pages/UserProfile';
import RegisterPage from './pages/Register';
import AdminPanel from './pages/AdminPanelPage';
import { Contact } from './pages/ContactPage';
import MisPolizasPage from './pages/MisPolizasPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CheckoutPage from './pages/CheckoutPage';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta /login y /register sin Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Resto de rutas con Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<AboutUs />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="productcard/:id" element={<ProductCardPage />} />
          <Route path="userProfile" element={<UserProfile/>} />
          <Route path="adminPanel" element={<AdminPanel/>} />
          <Route path="contacto" element={<Contact/>} />
          <Route path="misPolizas" element={<MisPolizasPage/>} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
      
      {/* Botón flotante de WhatsApp */}
      <WhatsAppFloat />
    </Router>
  );
}

export default App;
