import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import TopupUsername from './pages/TopupUsername/TopupUsername';
import TopupGamepass from './pages/TopupGamepass/TopupGamepass';
import Payment from './pages/Payment/Payment';
import Invoice from './pages/Invoice/Invoice';
import TrackOrder from './pages/TrackOrder/TrackOrder';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import NotFound from './pages/NotFound/NotFound';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Navbar />
        <main className="page-wrapper container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topup-username" element={<TopupUsername />} />
            <Route path="/topup-gamepass" element={<TopupGamepass />} />
            <Route path="/pembayaran" element={<Payment />} />
            <Route path="/invoice/:invoiceNo" element={<Invoice />} />
            <Route path="/lacak-pesanan" element={<TrackOrder />} />
            <Route path="/riwayat" element={<OrderHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </OrderProvider>
    </BrowserRouter>
  );
}

export default App;
