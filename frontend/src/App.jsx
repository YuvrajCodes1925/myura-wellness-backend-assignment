import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const initialProductForm = {
  product_name: "",
  price: "",
  category: "",
  stock: ""
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [loginForm, setLoginForm] = useState({ username: "admin", password: "admin123" });

  const [productForm, setProductForm] = useState(initialProductForm);
  const [orderForm, setOrderForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_address: "",
    quantities: {}
  });

  const selectedItems = useMemo(() => {
    return products
      .map((p) => ({ product_id: p.id, quantity: Number(orderForm.quantities[p.id] || 0), name: p.product_name }))
      .filter((item) => item.quantity > 0);
  }, [products, orderForm.quantities]);

  async function api(path, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    return data;
  }

  async function loadProducts() {
    setLoadingProducts(true);
    setError("");
    try {
      const data = await api("/products", { method: "GET" });
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingProducts(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleAdminLogin(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const data = await api("/admin/login", {
        method: "POST",
        body: JSON.stringify(loginForm)
      });
      setToken(data.token);
      localStorage.setItem("admin_token", data.token);
      setSuccess("Admin login successful. Token saved in browser.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAddProduct(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api("/products", {
        method: "POST",
        body: JSON.stringify({
          product_name: productForm.product_name,
          price: Number(productForm.price),
          category: productForm.category,
          stock: Number(productForm.stock)
        })
      });

      setProductForm(initialProductForm);
      setSuccess("Product added.");
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handlePlaceOrder(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (selectedItems.length === 0) {
      setError("Select at least one product quantity greater than zero.");
      return;
    }

    try {
      await api("/orders", {
        method: "POST",
        body: JSON.stringify({
          customer_name: orderForm.customer_name,
          customer_email: orderForm.customer_email,
          customer_address: orderForm.customer_address,
          items: selectedItems.map(({ product_id, quantity }) => ({ product_id, quantity }))
        })
      });

      setOrderForm({
        customer_name: "",
        customer_email: "",
        customer_address: "",
        quantities: {}
      });
      setSuccess("Order placed successfully.");
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1>Myura Wellness Assignment</h1>

      <div className="grid">
        <div className="card">
          <h3>Admin Login (Bonus JWT)</h3>
          <form onSubmit={handleAdminLogin}>
            <label>Username</label>
            <input
              value={loginForm.username}
              onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
            />
            <label>Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
            />
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="card">
          <h3>Add Product</h3>
          <form onSubmit={handleAddProduct}>
            <label>Product Name</label>
            <input
              value={productForm.product_name}
              onChange={(e) => setProductForm((prev) => ({ ...prev, product_name: e.target.value }))}
              required
            />

            <label>Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={productForm.price}
              onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
              required
            />

            <label>Category</label>
            <input
              value={productForm.category}
              onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value }))}
              required
            />

            <label>Stock</label>
            <input
              type="number"
              min="0"
              step="1"
              value={productForm.stock}
              onChange={(e) => setProductForm((prev) => ({ ...prev, stock: e.target.value }))}
              required
            />

            <button type="submit">Add Product</button>
          </form>
        </div>

        <div className="card">
          <h3>Place Order</h3>
          <form onSubmit={handlePlaceOrder}>
            <label>Customer Name</label>
            <input
              value={orderForm.customer_name}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, customer_name: e.target.value }))}
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={orderForm.customer_email}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, customer_email: e.target.value }))}
              required
            />

            <label>Address</label>
            <textarea
              value={orderForm.customer_address}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, customer_address: e.target.value }))}
              required
            />

            <label>Products & Quantities</label>
            <div className="items-grid">
              {products.map((product) => (
                <div key={product.id} className="item-row">
                  <span>
                    {product.product_name} (Stock: {product.stock})
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={orderForm.quantities[product.id] || ""}
                    onChange={(e) =>
                      setOrderForm((prev) => ({
                        ...prev,
                        quantities: {
                          ...prev.quantities,
                          [product.id]: e.target.value
                        }
                      }))
                    }
                  />
                </div>
              ))}
            </div>

            <button type="submit">Place Order</button>
          </form>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Products</h3>
        <button onClick={loadProducts} disabled={loadingProducts}>
          {loadingProducts ? "Refreshing..." : "Refresh Products"}
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.product_name}</td>
                <td>{Number(product.price).toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error ? <p className="message error">{error}</p> : null}
      {success ? <p className="message success">{success}</p> : null}
    </div>
  );
}