import React, { createContext, useContext, useState } from 'react';
import { generateInvoiceNo } from '../data/mockData';

const OrderContext = createContext();

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [currentOrder, setCurrentOrder] = useState(() => {
    const draft = localStorage.getItem('starbux_current_order');
    return draft ? JSON.parse(draft) : null;
  });

  const [orders, setOrders] = useState(() => {
    const data = localStorage.getItem('starbux_orders');
    return data ? JSON.parse(data) : [];
  });

  function saveCurrentOrder(orderData) {
    setCurrentOrder(orderData);
    if (orderData) {
      localStorage.setItem('starbux_current_order', JSON.stringify(orderData));
    } else {
      localStorage.removeItem('starbux_current_order');
    }
  }

  function placeOrder(dataOrder) {
    const invoiceNo = generateInvoiceNo();
    const pesananBaru = {
      ...dataOrder,
      invoiceNo,
      status: 'Menunggu Pembayaran',
      tanggal: new Date().toISOString(),
    };
    setOrders((prevOrders) => {
      const daftarBaru = [pesananBaru, ...prevOrders];
      localStorage.setItem('starbux_orders', JSON.stringify(daftarBaru));
      return daftarBaru;
    });
    saveCurrentOrder(null);
    return pesananBaru;
  }

  function updateStatus(invoiceNo, statusBaru) {
    setOrders((prevOrders) => {
      const updated = prevOrders.map((o) =>
        o.invoiceNo === invoiceNo ? { ...o, status: statusBaru } : o
      );
      localStorage.setItem('starbux_orders', JSON.stringify(updated));
      return updated;
    });
  }

  function simulasiStatus(invoiceNo) {
    setTimeout(() => {
      updateStatus(invoiceNo, 'Diproses');
    }, 3000);
    setTimeout(() => {
      updateStatus(invoiceNo, 'Selesai');
    }, 7000);
  }

  function cariPesanan(invoiceNo) {
    const data = localStorage.getItem('starbux_orders');
    const list = data ? JSON.parse(data) : orders;
    return list.find((o) => o.invoiceNo === invoiceNo) || null;
  }

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        setCurrentOrder: saveCurrentOrder,
        orders,
        placeOrder,
        updateStatus,
        simulasiStatus,
        cariPesanan,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
