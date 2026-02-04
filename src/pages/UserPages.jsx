import { useState, useEffect } from "react";
import api from "../api/mockAPI";

const UserPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2 text-gray-800">{p.name}</h3>
            <p className="text-blue-600 font-semibold mb-1">
              Rp {p.price.toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              {p.description || "Tidak ada deskripsi."}
            </p>
            <p
              className={`text-sm font-medium ${p.stock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {p.stock > 0 ? `Stok: ${p.stock}` : "Stok habis"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
