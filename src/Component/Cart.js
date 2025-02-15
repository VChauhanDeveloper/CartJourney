import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 5 },
  { id: 2, name: "Smartphone", price: 800, stock: 8 },
  { id: 3, name: "Headphones", price: 200, stock: 10 },
];

export default function Inventory() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && product.stock>item.quantity ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <button className="btn btn-dark" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 border rounded shadow-sm">
        <h5 className="d-flex align-items-center">
          <ShoppingCart className="me-2" /> Cart
        </h5>
        {cart.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <>
            <ul className="list-group mt-2">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 fw-bold text-end"> <span className="">Total: </span> <span>${totalAmount}</span></div>
          </>
        )}
      </div>
    </div>
  );
}
