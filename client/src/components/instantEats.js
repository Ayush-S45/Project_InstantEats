import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import RestaurantList from './RestaurantList';
import RestaurantDetail from './RestaurantDetail';
import Cart from './checkouts';
import Profile from './Profile';
import { CartProvider } from '../context/CartContext';

function Main() {
  return (
    <CartProvider>
      <>
        <Navbar/>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="restaurant/:id" element={<RestaurantDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </>
    </CartProvider>
  );
}

export default Main;
