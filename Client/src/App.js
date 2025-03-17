import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import RawMaterial from './Pages/RawMaterial/RawMaterial';
import StockMaterial from './Pages/StockMaterial/StockMaterial';
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp';
import Navbar from './Component/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import InRawProduct from './Component/InRawProduct/InRawProduct';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/raw-material' element={<RawMaterial />} />
        <Route path='/raw-material/raw-in-edit' element={<InRawProduct />} />
        <Route path='/stock-material' element={<StockMaterial />} />
        <Route path='/login-signup' element={<LoginSignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
