import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductCardPage from './pages/ProductCard';
import Layout from './components/Layout';
import { LoginPage } from './pages/Login';
import UserProfile from './pages/UserProfile';
import RegisterPage from './pages/Register';
import AdminPanel from './pages/AdminPanelPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/productcard" element={<ProductCardPage />} />
        </Routes>
      </Layout>
      <Routes>
        {/* Ruta /login y /register sin Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Resto de rutas con Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<AboutUs />} />

          <Route path="productcard/:id" element={<ProductCardPage />} />
          <Route path="userProfile" element={<UserProfile/>} />
          <Route path="adminPanel" element={<AdminPanel/>} />
          <Route path="cart" element={<CartPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;