import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><RestaurantList /></Layout>} />
        <Route path="/restaurant/:id" element={<Layout><RestaurantDetail /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
