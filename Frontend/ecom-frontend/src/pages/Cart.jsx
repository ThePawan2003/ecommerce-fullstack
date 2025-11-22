import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "10px"
              }}
            >
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
