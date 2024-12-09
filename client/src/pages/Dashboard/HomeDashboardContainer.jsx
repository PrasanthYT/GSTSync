import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeDashboardContainer() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 100, stock: 10 },
    { id: 2, name: "Product 2", price: 200, stock: 5 },
    { id: 3, name: "Product 3", price: 300, stock: 8 },
  ]);

  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: 0,
    price: 0,
    tax: 0,
  }); // New product state

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding product to the selected list
  const addProductToCart = (product) => {
    const existingProduct = selectedProducts.find(
      (selectedProduct) => selectedProduct.id === product.id
    );

    if (existingProduct) {
      // If the product is already in the cart, just increase the quantity
      setSelectedProducts(
        selectedProducts.map((selectedProduct) =>
          selectedProduct.id === product.id
            ? { ...selectedProduct, quantity: selectedProduct.quantity + 1 }
            : selectedProduct
        )
      );
    } else {
      // If the product is not in the cart, add it with quantity 1
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  // Calculate grand total
  const grandTotal = selectedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Handle form submission for POS (Sale)
  const handleSubmit = (e) => {
    e.preventDefault();
    const saleDetails = {
      customerName,
      products: selectedProducts,
      grandTotal,
    };
    console.log("Sale Details:", saleDetails);

    // Reduce the stock based on the sale
    const updatedProducts = [...products];

    selectedProducts.forEach((selectedProduct) => {
      const productIndex = updatedProducts.findIndex(
        (product) => product.id === selectedProduct.id
      );

      if (productIndex !== -1) {
        updatedProducts[productIndex].stock -= selectedProduct.quantity;
      }
    });

    setProducts(updatedProducts); // Update the products state with reduced stock

    // Clear the form after submission
    setCustomerName("");
    setSelectedProducts([]);
    setSearchTerm("");
  };

  // Handle form input change for new product
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle adding new product to inventory
  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1, // Generate a new id based on the current list length
        name: newProduct.name,
        price: newProduct.price * (1 + newProduct.tax / 100), // Apply tax to price
        stock: newProduct.stock, // Add stock to the product
      },
    ]);
    setIsModalOpen(false); // Close modal after adding the product
    setNewProduct({
      name: "",
      stock: 0,
      price: 0,
      tax: 0,
    });
  };

  return (
    <>
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">
            GST Sync
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
            Dashboard
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    GST & User Details
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Details of the user we colledted during registration
                  </p>
                  {/* Additional content */}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>

            {/* Sales Report Section */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Sales Report
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    View detailed sales reports to track your business
                    performance and analyze transactions, all in one
                    easy-to-navigate dashboard.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <div className="flex flex-wrap justify-center gap-y-4 gap-x-6">
                    <a className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                      <Link
                        to="/auth/signup"
                        className="relative text-base font-semibold text-white"
                      >
                        View Sales
                      </Link>
                    </a>
                    <a className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
                      <Link
                        to="/auth/signin"
                        className="relative text-base font-semibold text-primary dark:text-white"
                      >
                        Add Sales
                      </Link>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>

            {/* Add or View Products Section */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col gap-10 overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Add or View Products
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Easily add products to your inventory by entering key
                    details like name, price, and quantity.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <div className="flex flex-wrap justify-center gap-y-4 gap-x-6">
                    {/* View Products */}
                    <a
                      onClick={() => setIsModalOpen(true)} // Open modal when clicked
                      className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    >
                      <span className="relative text-base font-semibold text-white">
                        Add Products
                      </span>
                    </a>
                    <a className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
                      View Products
                    </a>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
            </div>

            {/* POS Section with Customer Info and Search Bar */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col gap-10 overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <form onSubmit={handleSubmit}>
                  {" "}
                  {/* Wrap the form in a submit handler */}
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Point of Sale (POS)
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Manage customer sales transactions, add products, and
                      generate invoices.
                    </p>

                    {/* Customer Info Form */}
                    <div className="mt-6 flex flex-col gap-4">
                      <label className="text-sm font-medium text-gray-700">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="px-4 py-2 border rounded-md text-gray-800"
                        placeholder="Enter customer name"
                        required
                      />
                    </div>

                    {/* Search Bar for Products */}
                    <div className="mt-4 relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Search for products..."
                      />

                      {/* Dropdown for filtered products */}
                      {searchTerm && filteredProducts.length > 0 && (
                        <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg max-h-48 overflow-y-auto z-10">
                          {filteredProducts.map((product, index) => (
                            <div
                              key={index}
                              onClick={() => addProductToCart(product)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {product.name} - ₹{product.price}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Added Products */}
                    <div className="mt-6 max-h-30 overflow-y-scroll">
                      {selectedProducts.map((product, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <span>
                            {product.name} - ₹{product.price}
                          </span>
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => {
                              const updatedProducts = [...selectedProducts];
                              updatedProducts[index].quantity = Math.max(
                                1,
                                parseInt(e.target.value, 10)
                              ); // Prevent quantity below 1
                              setSelectedProducts(updatedProducts);
                            }}
                            className="w-16 p-1 border rounded-md"
                            min="1"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Grand Total */}
                    <div className="mt-6 flex justify-between items-center">
                      <span className="font-semibold text-xl">Grand Total</span>
                      <span className="font-semibold text-xl">
                        ₹{grandTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center p-8">
                      <button
                        type="submit"
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                      >
                        <span className="relative text-base font-semibold text-white">
                          Process Sale
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for adding new product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <div className="flex flex-col gap-4">
              <label htmlFor="productName" className="text-sm font-medium">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleProductChange}
                className="px-4 py-2 border rounded-md text-gray-800"
                placeholder="Enter product name"
                required
              />

              <label htmlFor="productPrice" className="text-sm font-medium">
                Price
              </label>
              <input
                id="productPrice"
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleProductChange}
                className="px-4 py-2 border rounded-md text-gray-800"
                placeholder="Enter price"
                required
              />

              <label htmlFor="productStock" className="text-sm font-medium">
                Stock
              </label>
              <input
                id="productStock"
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleProductChange}
                className="px-4 py-2 border rounded-md text-gray-800"
                placeholder="Enter stock"
                required
              />

              <label htmlFor="productTax" className="text-sm font-medium">
                Tax (%)
              </label>
              <input
                id="productTax"
                type="number"
                name="tax"
                value={newProduct.tax}
                onChange={handleProductChange}
                className="px-4 py-2 border rounded-md text-gray-800"
                placeholder="Enter tax percentage"
              />

              <div className="mt-4 flex justify-between">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
                <button
                  className="px-6 py-2 bg-gray-300 text-black rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeDashboardContainer;
