import storeItems from '../data/items';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import ItemButtons from './ItemButtons';
import { useState } from 'react';
import StoreItemPreview from './StoreItemPreview';
import { NavLink } from 'react-router-dom';

import Icon from './Icon';

export default function ShoppingCart() {
  const { isCartOpen, cartItems, closeCart, clearCart } = useShoppingCart();

  const total = cartItems.reduce((total, item) => {
    const price = storeItems.find((i) => i.id === item.id)?.price;
    if (price === undefined) return total;

    return total + price * item.quantity;
  }, 0);

  return (
    <div
      className={
        'text-secondary-800 z-10 flex flex-col transition-opacity duration-300 overflow-hidden fixed top-14 w-80 bg-primary-300 right-0 lg:right-[calc(50%-488px)]' +
        (isCartOpen
          ? ' h-auto max-h-[calc(100%-56px)] opacity-100 border-t border-opacity-70 border-t-primary-500'
          : ' h-0 opacity-0 ')
      }
    >
      {cartItems.length === 0 ? (
        <div className="h-24 py-5 px-3 bg-primary-400 flex flex-col justify-between">
          <button
            onClick={closeCart}
            className="ml-auto flex justify-center items-center h-6"
          >
            <Icon type="close" className="w-8 h-8" />
          </button>
          <p className="font-medium">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex h-16 p-3 py-5 bg-primary-400">
            <button
              onClick={clearCart}
              className="uppercase font-bold relative hover:after:w-12 after:content-[' '] after:absolute after:bottom-0 after:left-0 after:w-0 after:border-b-2 after:border-b-secondary-800 after:transition-all after:duration-200"
            >
              Clear
            </button>
            <button
              onClick={closeCart}
              className="ml-auto flex justify-center items-center"
            >
              <Icon type="close" className="w-8 h-8" />
            </button>
          </div>
          <ul className="cart-scrollbar overflow-y-scroll max-h-100">
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </ul>
          <div className="bg-primary-400 p-2">
            <div className="flex justify-between font-bold">
              <span>
                TOTAL AMOUNT:
                <small className="block italic">(shipping included)</small>
              </span>
              {formatCurrency(total)}
            </div>
            <div className="block md:hidden text-center mt-4 w-full">
              <NavLink
                to="/luxury-pens-e-commerce/Basket"
                className="block text-lg font-medium border-2 py-1 w-full rounded-md transition-all duration-200 border-primary-600 hover:bg-primary-600 hover:text-secondary-50 hover:tracking-wide"
              >
                Checkout
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { removeItem } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item === undefined) return null;

  return (
    <li className="border-b border-opacity-50 border-b-primary-400 last-of-type:border-b-0">
      <div className="pr-1 pl-3 py-4 flex flex-col">
        <img
          src={item.paths.lowQuality[0]}
          alt={item.name}
          className="h-20 w-full object-cover"
        />
        <div className="flex justify-between items-center gap-4 my-3">
          <div className="text-[15px] font-bold">{item.name}</div>
          <div>{formatCurrency(item.price)}</div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="text-left uppercase font-medium basis-1/2 relative hover:after:w-10 after:content-[' '] after:absolute after:bottom-0 after:left-0 after:w-0 after:border-b-2 after:border-b-secondary-800 after:transition-all after:duration-200"
          >
            View
          </button>
          <ItemButtons
            id={item.id}
            className="inline-flex shrink-0 h-8 w-28 text-base"
          />
          <button
            onClick={() => removeItem(item.id)}
            className="text-right uppercase font-medium basis-1/2 relative hover:after:w-16 after:content-[' '] after:absolute after:bottom-0 after:right-0 after:w-0 after:border-b-2 after:border-b-secondary-800 after:transition-all after:duration-200"
          >
            Remove
          </button>
        </div>
        {isPreviewOpen && (
          <StoreItemPreview
            closeMenu={() => setIsPreviewOpen(false)}
            {...item}
          />
        )}
      </div>
    </li>
  );
}
