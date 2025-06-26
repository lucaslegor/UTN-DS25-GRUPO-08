import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductCardPage from './pages/ProductCard';
import Layout from './components/Layout';

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
    </Router>
  )
}

export default App
