import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Navigation from "./components/Navigation";
import Preview from "./pages/Preview";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutPage1 from "./pages/CheckoutPage1";

function App() {
  return (
    <>
      <BrowserRouter basename="/NEXUS">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
