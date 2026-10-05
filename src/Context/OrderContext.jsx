"use client";

import { createContext, useEffect, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load orders from localStorage once, when the app starts
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (error) {
      console.log(error);
    }
    setLoaded(true);
  }, []);

  // Save orders only after the first load has finished
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("orders", JSON.stringify(orders));
    } catch (error) {
      console.log(error);
    }
  }, [orders, loaded]);

const addOrder = (order) => {
  console.log(" ADD ORDER CALLED:", order);

  setOrders((prevOrders) => {
    console.log(" PREVIOUS ORDERS:", prevOrders);

    return [...prevOrders, order];
  });
};

const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders)=>prevOrders.map((order)=>order.id === orderId ? {...order, status: newStatus}:order));
}


  return (
    <OrderContext.Provider value={{ orders, loaded, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider };
export default OrderContext;