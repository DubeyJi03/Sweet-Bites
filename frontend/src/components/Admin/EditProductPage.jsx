import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const { selectedProduct, loading , error } = useSelector((state)=> state.products);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    collections: "",
    weight: [],
    flavours: [],
    images: [
    ],
  });

  const [uploading, setUploading] = useState(false); // Image uplaoding star

  useEffect(()=> {
    if (id){
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(()=> {
    if(selectedProduct){
      setProductData(selectedProduct);
    }
  },[selectedProduct]);

  // ✅ handle normal text/number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ✅ handle image upload + preview
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData(); // Correct capitalization
    formData.append("image", file);

    try {
      setUploading(true);
      const {data} = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type" : "multipart/form-data"
          },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, {url: data.imageUrl, altText: ""}], // Corrected altText property name
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // ✅ remove image
  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ✅ submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({id, productData}));
    navigate("/admin/products");
  };

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error...</p>

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 shadow-md rounded-md bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Product Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            min="0"
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            min="0"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Weight */}
<div className="mb-6">
  <label className="block font-semibold mb-2">Weight (comma-separated)</label>
  <input
    type="text"
    name="weight"
    // 💡 Fix: Use optional chaining and nullish coalescing
    value={productData.weight?.join(", ") ?? ""}
    onChange={(e) =>
      setProductData({
        ...productData,
        weight: e.target.value.split(",").map((w) => w.trim()),
      })
    }
    className="w-full border border-gray-300 rounded-md p-2"
  />
</div>

{/* Flavours */}
<div className="mb-6">
  <label className="block font-semibold mb-2">Flavours (comma-separated)</label>
  <input
    type="text"
    name="flavours"
    // 💡 Fix: Use optional chaining and nullish coalescing
    value={productData.flavours?.join(", ") ?? ""}
    onChange={(e) =>
      setProductData({
        ...productData,
        flavours: e.target.value.split(",").map((f) => f.trim()),
      })
    }
    className="w-full border border-gray-300 rounded-md p-2"
  />
</div>

        {/* Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Images</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={image.altText || "Product"}
                  className="w-full h-24 sm:h-28 md:h-32 object-cover shadow-md rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>  
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};


export default EditProductPage;