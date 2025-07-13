"use client";

import {
  Dialog,
  Transition,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import type { Product } from "../api/productApi";

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
  dataLength: number;
};

const AddProductModal = ({ isOpen, onClose, onAdd, dataLength } :AddProductModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (data: Product) => {
    const newProduct = {
      ...data,
      id: dataLength + 1,
    };
    onAdd(newProduct);
    reset();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        {/* Backdrop transition */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>

        {/* Modal wrapper */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* Modal panel transition */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[92%] max-w-sm sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Add Product
                  </DialogTitle>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 space-y-3"
                  >
                    {/* Title */}
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Title<span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-gray-50 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 has-[input:focus-within]:bg-gray-100">
                          <input
                            type="text"
                            {...register("title", { required: true })}
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                          />
                        </div>
                        {errors.title && (
                          <p className="text-sm text-red-500">
                            Title is required
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Category<span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-gray-50 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 has-[input:focus-within]:bg-gray-100">
                          <input
                            type="text"
                            {...register("category", { required: true })}
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                          />
                        </div>
                        {errors.category && (
                          <p className="text-sm text-red-500">
                            Category is required
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Price<span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-gray-50 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 has-[input:focus-within]:bg-gray-100">
                          <input
                            type="number"
                            {...register("price", { required: true })}
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                          />
                        </div>
                        {errors.price && (
                          <p className="text-sm text-red-500">
                            Price is required
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Image */}
                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Image URL
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-gray-50 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 has-[input:focus-within]:bg-gray-100">
                          <input
                            type="text"
                            {...register("thumbnail")}
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          reset();
                          onClose();
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-white rounded bg-indigo-600 font-medium hover:bg-indigo-700 cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddProductModal;
