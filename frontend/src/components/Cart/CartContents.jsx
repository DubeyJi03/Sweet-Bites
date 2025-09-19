import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

const CartContents = ({cart, userId, guestId}) => {
  const dispatch = useDispatch();

  // handle adding or subscribing to cart 
  const handleAddToCart = (productId, delta, quantity, weights) => {
    const newQuantity = quantity + delta;
    if( newQuantity >= 1) {
      // Ensure productId is a string, not an object
      const id = typeof productId === 'object' ? productId._id : productId;
      dispatch(
        updateCartItemQuantity({
          productId: id,
          quantity: newQuantity,
          guestId,
          userId,
          weights,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, weights) => {
    // Ensure productId is a string, not an object
    const id = typeof productId === 'object' ? productId._id : productId;
    dispatch(removeFromCart({productId: id, guestId, userId, weights}));
  }

  return (
    <div>
      {
        cart.products.map((product, index) => (
          <div
            key={`${product.productId?._id || product.productId}-${product.weights}-${index}`}
            className="flex items-start justify-between py-4 border-b">
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded ml-2 mr-4 mt-2"
              />
              <div>
                {/* Applied font-semibold and text-lg for product name */}
                <h3 className="font-semi-bold text-lg">{product.name}</h3>

                <p className='text-sm text-gray-500'>
                  Weight: {product.weights} | Quantity: {product.quantity}</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => handleAddToCart(
                    product.productId, 
                    -1, 
                    product.quantity, 
                    product.weights
                  )
                } 
                  className="border rounded px-2 py-1 text-xl font-medium">-</button>
                  <span className="mx-2">{product.quantity}</span>
                  <button onClick={() => handleAddToCart(
                    product.productId, 
                    1, 
                    product.quantity, 
                    product.weights
                  )
                } 
                  className="border rounded px-2 py-1 text-xl font-medium">+</button>
                </div>
              </div>
            </div>
            <div>
              {/* Applied font-bold for product price */}
              <p className="mr-4 mt-7">₹ {product.price * product.quantity}</p>
              <button 
              onClick={() => 
                handleRemoveFromCart(
                product.productId, 
                product.weights
                )
              }
              className="mt-2 ml-auto block"> {/* Added ml-auto and block to push button to right */}
                <RiDeleteBin6Line className="h-6 w-6 mr-4 mt-1 text-gray-600 hover:text-red-500" /> {/* Added hover effect */}
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CartContents;