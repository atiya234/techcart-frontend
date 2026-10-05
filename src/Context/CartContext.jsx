"use client"


import { createContext, useEffect } from 'react';
import { useState } from 'react';

const cartContext = createContext();

export function CartProvider({children}){
const [cart , setCart] = useState([]);
const [loaded , setLoaded] = useState(false);

useEffect(()=>{

try{
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));

} catch(error) {
    console.log(error)

}
setLoaded(true)

},[])

useEffect(()=>{
    if(!loaded)
        return;
    try {
        localStorage.setItem("cart", JSON.stringify(cart));

    }catch(error){
        console.log(error)
    }
}, [cart ,loaded]) //runs everytime when card is changes


const addToCart = (product) => {
    setCart((prev)=> {
    const existing = prev.find((item)=>item.id === product.id)

    if (existing){
        return prev.map((item)=>item.id === product.id ? { ...item, quantity: item.quantity + 1}: item ) 
    }

    return [
        ...prev, {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1
        }
    ]

  })  
};

const removeFromCart = (id) => {
    setCart((prev)=> prev.filter((item)=> item.id !== id));
}


const clearCart = () => {
    setCart([]);
}
const updateQuantity = (id , quantity) => {
    if(quantity < 1) return;
    setCart((prev)=> 
    prev.map((item)=>item.id === id ? {...item , quantity} : item))
}

const itemCount = cart.reduce((sum , item)=> sum + item.quantity, 0);
const subtotal = cart.reduce((sum , item)=>sum + item.price * item.quantity,  0)

return (
    <cartContext.Provider value = {{cart , setCart , addToCart, loaded, itemCount, subtotal, removeFromCart, updateQuantity, clearCart}} >
        {children}
    </cartContext.Provider>
)
}

export default cartContext;

