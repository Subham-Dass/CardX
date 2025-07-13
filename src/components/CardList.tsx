import { useState, useEffect } from "react";
import Card from "./Card";
import { getProducts, deleteProduct, addProduct } from "../api/productApi.js";
import DeleteCardModal from "./DeleteCardModal.jsx";
import AddCardModal from "./AddCardModal.jsx";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

const CardList = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    getProducts().then((data) => {
      setProductData(data);
      setIsLoading(false);
    });
  }, []);

  // const addProduct = (newProduct) => {
  //   setProductData((prev) => [newProduct, ...prev]);
  //   toast.success("Product added successfully!");
  // };

  // const deleteRecord = () => {
  //   deleteProduct(productToDelete).then(() => {
  //     setProductData((prev) => prev.filter((p) => p.id !== productToDelete));
  //     setDeleteModalOpen(false);
  //     setProductToDelete(null);
  //     toast.success("Product deleted successfully!");
  //   });
  // };

  const addRecord = (newProduct) => {
  toast.loading("Adding product...");

  // Fallback thumbnail if not provided
  if (!newProduct.thumbnail) {
    newProduct.thumbnail = "src/assets/no-image.png";
  }

  addProduct(newProduct)
    .then((createdProduct) => {
      if (createdProduct) {
        setProductData((prev) => [createdProduct, ...prev]);
        toast.dismiss();
        toast.success("Product added successfully!");
      } else {
        toast.dismiss();
        toast.error("Failed to add product.");
      }
    })
    .catch((err) => {
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
      .catch((err) => {
        console.error("Delete failed:", err);
        toast.dismiss();
        toast.error("Failed to delete product.");
      });
  };

  const openDeleteModal = (id) => {
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
