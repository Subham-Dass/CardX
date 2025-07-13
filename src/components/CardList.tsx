import { useState, useEffect } from "react";
import Card from "./Card";
import { getProducts, deleteProduct, addProduct } from "../api/productApi.ts";
import DeleteCardModal from "./DeleteCardModal.jsx";
import AddCardModal from "./AddCardModal.jsx";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { type Product } from "../api/productApi.ts";

const CardList = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      setProductData(data);
      setIsLoading(false);
    });
  }, []);

  const addRecord = (newProduct: Product) => {
    toast.loading("Adding product...");

    // Fallback thumbnail if not provided
    if (!newProduct.thumbnail) {
      newProduct.thumbnail = "/no_image.png";
    }

    addProduct(newProduct)
      .then((createdProduct: Product) => {
        if (createdProduct) {
          setProductData((prev) => [newProduct, ...prev]);
          toast.dismiss();
          toast.success("Product added successfully!");
        } else {
          toast.dismiss();
          toast.error("Failed to add product.");
        }
      })
      .catch((err: Error) => {
        console.error("Add failed:", err);
        toast.dismiss();
        toast.error("Something went wrong.");
      });
  };

  const deleteRecord = () => {
    toast.loading("Deleting product...");

    deleteProduct(productToDelete)
      .then(() => {
        setProductData((prev) => prev.filter((p) => p.id !== productToDelete));
        setDeleteModalOpen(false);
        setProductToDelete(null);
        toast.dismiss();
        toast.success("Product deleted successfully!");
      })
      .catch((err: Error) => {
        console.error("Delete failed:", err);
        toast.dismiss();
        toast.error("Failed to delete product.");
      });
  };

  const openDeleteModal = (id: number) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="wrapper">
        <div className="flex justify-end px-4 mb-6">
          <button
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-shadow shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => setAddModalOpen(true)}
          >
            + Add Product
          </button>
        </div>

        {productData.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <img src="/no_data.png" alt="No data" className="w-60 h-auto mb-4 opacity-80" />
          </div>
        ) : (
          <div className="cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {productData.map((product) => (
                <Card
                  key={product.id}
                  cardData={product}
                  onDelete={() => openDeleteModal(product.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    )}

    <DeleteCardModal
      isOpen={isDeleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      onConfirm={deleteRecord}
    />

    <AddCardModal
      isOpen={isAddModalOpen}
      onClose={() => setAddModalOpen(false)}
      onAdd={addRecord}
      dataLength={productData.length}
    />
    </>
  );
};

export default CardList;
