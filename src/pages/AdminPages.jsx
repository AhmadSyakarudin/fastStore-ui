import { useState, useEffect } from "react";
import api from "../api/mockAPI";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
    setEditId(null);
    setForm({ name: "", price: "", description: "", stock: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description,
    };

    if (isEdit) {
      await api.put(`/products/${editId}`, payload);
    } else {
      await api.post("/products", payload);
    }

    closeModal();
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
    setIsEdit(true);
    setEditId(product.id);
    setIsOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition cursor-pointer"
        >
          + Tambah Produk
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Produk
                </label>
                <input
                  id="name"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Harga (Rp)
                </label>
                <input
                  id="price"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stok
                </label>
                <input
                  id="stock"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  type="text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 text-gray-700 p-2 rounded-lg font-bold hover:bg-gray-200 transition cursor-pointer"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition cursor-pointer"
                >
                  {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-200">
            <tr>
              {/* Menggunakan px-6 py-4 yang konsisten untuk semua kolom */}
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Nama
              </th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Harga
              </th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Stok
              </th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Deskripsi
              </th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                {/* Padding px-6 disamakan dengan header */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  {p.name}
                </td>
                <td className="px-6 py-4 text-blue-600 font-bold">
                  Rp {p.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-600">{p.stock}</td>
                <td className="px-6 py-4 text-gray-600 text-sm font-semibold">
                  {p.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-green-600 hover:bg-green-50 px-3 py-1 rounded border border-green-600 transition text-sm cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (globalThis.confirm("Hapus produk ini?")) {
                          api.delete(`/products/${p.id}`).then(fetchProducts);
                        }
                      }}
                      className="text-red-600 hover:bg-red-50 px-3 py-1 rounded border border-red-600 transition text-sm cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
