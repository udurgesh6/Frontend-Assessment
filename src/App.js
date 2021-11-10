import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Sign from "./Sign";
import Products from "./Products";
import AddProduct from "./AddProduct";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
