import React, { useRef } from "react";
import Link from "next/link";
import { useData } from "../store";
import cartActions from "../store/actions/cartActions";
import { useRouter } from "next/router";

const Navbar = () => {
  const { state, dispatch } = useData();
  const router = useRouter();

  const toggleCart = () => {
    if (state.isCartOpen) {
      dispatch({ type: cartActions.TOGGLE_CART });
    } else {
      dispatch({ type: cartActions.TOGGLE_CART });
    }
  };

  const cartRef = useRef();

  const goToCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  return (
    <>
      <div
        ref={cartRef}
        className={`cart fixed right-0 h-screen md:w-1/2 w-full border-l-2 p-3 bg-white transform z-40 transition-transform ${
          state.isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div onClick={toggleCart} className="absolute top-2 left-2">
          <button>x</button>
        </div>

        <div className="p-4 py-10">
          <h1 className="text-center text-xl"> My Cart</h1>

          {state.cart.length > 0 ? (
            <div className="py-5">
              {state.cart.map((item, index) => (
                <div key={index} className="flex justify-between my-2">
                  <div className="flex flex-col">
                    <img
                      className="w-20 h-20"
                      src={item.product.image.data.attributes.name}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm">{item.product.title}</div>
                    <div className="text-xs text-gray-600">
                      {item.quantity} x ₹ {item.price}
                    </div>
                  </div>
                  <div className="text-sm">₹ {item.quantity * item.price}</div>
                  <button
                    onClick={() =>
                      dispatch({
                        type: cartActions.REMOVE_CART_ITEM,
                        payload: item.slug,
                      })
                    }
                    className="text-red-500"
                  >
                    x
                  </button>
                </div>
              ))}
              <div className="flex justify-between my-5 border-2 p-2 rounded border-blue-500">
                <div className="text-lg">Total</div>
                <div className="text-lg">
                  ₹{" "}
                  {state.cart.reduce((acc, item) => {
                    return acc + item.quantity * item.price;
                  }, 0)}
                </div>
              </div>
              <button
                onClick={goToCheckout}
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Checkout
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
      <header className="text-gray-600 border-b-2 z-10 border-gray-200 sticky top-0 bg-white body-font">
        <div className="flex flex-wrap px-5 py-3 flex-col md:flex-row items-center">
          <div className="flex flex-wrap flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">MY SHOP</span>
            </a>
            <nav className="flex flex-wrap items-center ml-10 text-base justify-center">
              <Link href="/">
                <a className="mr-5 hover:text-gray-900">Women</a>
              </Link>
              <Link href="/products">
                <a className="mr-5 hover:text-gray-900">Men</a>
              </Link>
              <Link href="/about">
                <a className="mr-5 hover:text-gray-900">Kids</a>
              </Link>
              <Link href="/contact">
                <a className="mr-5 hover:text-gray-900">Tech</a>
              </Link>
            </nav>
          </div>
          <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <button onClick={toggleCart}>
              <div className="mr-5 hover:text-gray-900">
                <p className="text-gray-900">Cart</p>
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
