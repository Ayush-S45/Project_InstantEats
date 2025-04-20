import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PaymentGateway from './components/PaymentGateway';
import { CartProvider } from './context/CartContext';
import Main from './components/instantEats';
import RestaurantDetail from './components/RestaurantDetail';
import Cart from './components/checkouts';
import Search from './components/Search';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/search" element={<Search />} />
            <Route path="/instanteats/*" element={<Main />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
