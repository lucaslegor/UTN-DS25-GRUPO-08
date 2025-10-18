import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import FormularioCompra from "../components/FormularioCompra";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  React.useEffect(() => {
    if (cartItems.length === 0) navigate("/cart");
  }, [cartItems, navigate]);

  // ⇩⇩⇩ stub de prueba (reemplazá con tu POST real a /api/pagos)
  const crearPreferenciaPago = async (payload) => {
    // Ejemplo: POST a /api/pagos con { items, payer, metadata }
    const res = await fetch("http://localhost:3000/api/pagos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idPedido: 123, payer: payload.payer }), // adapta a tu backend
    });
    if (!res.ok) throw new Error("No se pudo crear la preferencia");
    const data = await res.json();
    return { initPoint: data.initPoint ?? data.init_point };
  };

  return (
    <div>
      <FormularioCompra
        carrito={cartItems}
        crearPreferenciaPago={crearPreferenciaPago}
      />
    </div>
  );
};

export default CheckoutPage;
