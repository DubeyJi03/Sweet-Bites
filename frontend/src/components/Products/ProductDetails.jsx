import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { motion } from "framer-motion";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const productFetchId = productId || id;

  const [selectedWeight, setSelectedWeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // Use a dynamic price calculation function that works with any weight string.
  const calculatePrice = (basePricePerKg, weight) => {
    const weightNumber = parseFloat(weight);
    if (isNaN(weightNumber)) {
      return basePricePerKg;
    }

    let weightInKg;
    if (weight.toLowerCase().includes("kg")) {
      weightInKg = weightNumber;
    } else if (weight.toLowerCase().includes("g")) {
      weightInKg = weightNumber / 1000;
    } else {
      return basePricePerKg;
    }
    return basePricePerKg * weightInKg;
  };

  useEffect(() => {
    if (selectedProduct) {
      const basePrice = selectedProduct.basePrice || selectedProduct.price;
      // Set the default selected weight to the first option if it exists
      if (selectedProduct.weights && selectedProduct.weights.length > 0) {
        const initialWeight = selectedProduct.weights[0];
        setSelectedWeight(initialWeight);
        const newPrice = calculatePrice(basePrice, initialWeight);
        setCurrentPrice(newPrice);
      } else {
        // If there are no weights, use the product's base price
        setSelectedWeight("");
        setCurrentPrice(basePrice);
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct && selectedWeight) {
      const basePrice = selectedProduct.basePrice || selectedProduct.price;
      const newPrice = calculatePrice(basePrice, selectedWeight);
      setCurrentPrice(newPrice);
    }
  }, [selectedWeight, selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedWeight) {
      toast.error("Please select a weight option.", { duration: 1000 });
      return;
    }
    if (!selectedProduct) {
      toast.error("Product not found.", { duration: 1000 });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        weights: selectedWeight,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Added to cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading || !selectedProduct) {
    return <p className="text-center">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const product = selectedProduct;

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {product.images?.map((image, index) => (
              <motion.img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 object-cover rounded-xl cursor-pointer border border-gray-200"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <motion.div
              className="mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <motion.img
                src={product.images?.[0]?.url}
                alt="Main Product"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>

          {/* Details */}
          <motion.div
            className="md:w-1/2 md:ml-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Category:{" "}
              <span className="font-medium text-gray-800">
                {product.category}
              </span>
            </p>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-red-600">
                ₹{currentPrice.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through ml-3 text-gray-500">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Weight Selection */}
            <div className="mb-6">
              <label
                htmlFor="weight"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Select Weight:
              </label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                id="weight"
                className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-amber-400 focus:outline-none"
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
              >
                <option value="">-- Please select --</option>
                {product.weights?.map((wt, index) => (
                  <option key={index} value={wt}>
                    {wt}
                  </option>
                ))}
              </motion.select>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-gray-800 font-medium">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  disabled={quantity === 1}
                >
                  -
                </motion.button>
                <span className="text-lg font-semibold">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleAddToCart}
              disabled={isButtonDisabled || !selectedWeight}
              className={`bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl w-full mb-6 shadow-md transition ${
                isButtonDisabled || !selectedWeight
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-amber-700"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </motion.button>

            {/* Characteristics Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Characteristics:</h3>
              <div className="flex flex-col space-y-2 text-gray-700">
                {product.category && (
                  <div className="flex items-center">
                    <span className="font-semibold w-24">Category:</span>
                    <span className="ml-2">{product.category}</span>
                  </div>
                )}
                {product.collections && (
                  <div className="flex items-center">
                    <span className="font-semibold w-24">Collections:</span>
                    <span className="ml-2">{product.collections}</span>
                  </div>
                )}
                {product.sweetType && (
                  <div className="flex items-center">
                    <span className="font-semibold w-24">Sweet:</span>
                    <span className="ml-2">{product.sweetType}</span>
                  </div>
                )}
                {product.types && (
                  <div className="flex items-center">
                    <span className="font-semibold w-24">Type:</span>
                    <span className="ml-2">{product.types}</span>
                  </div>
                )}
                {product.ingredients && (
                  <div className="flex items-center">
                    <span className="font-semibold w-24">Ingredients:</span>
                    <span className="ml-2">
                      {product.ingredients.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-semibold mb-10">
            You May Also Like
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <ProductGrid products={similarProducts} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;