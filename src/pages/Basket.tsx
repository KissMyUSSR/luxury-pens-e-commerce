import { useShoppingCart } from '../context/ShoppingCartContext';
import ItemButtons from '../components/ItemButtons';
import { formatCurrency } from '../utilities/formatCurrency';
import StoreItemPreview from '../components/StoreItemPreview';
import storeItems from '../data/items';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Icon from '../components/Icon';
import customerServiceIcon from '../icons/support.png';

export default function Basket() {
  const { closeCart, cartItems, toggleIsRemoveOnZero } = useShoppingCart();

  useEffect(() => {
    closeCart();
    toggleIsRemoveOnZero();

    return () => toggleIsRemoveOnZero();
  }, [closeCart, toggleIsRemoveOnZero]);

  const total = cartItems.reduce((total, item) => {
    const price = storeItems.find((i) => i.id === item.id)?.price;
    if (price === undefined) return total;

    return total + price * item.quantity;
  }, 0);

  return (
    <div className="pt-4 min-h-[calc(100vh-56px)]">
      <div className="px-6 md:mx-8 lg:max-w-5xl lg:mx-auto">
        <div className="flex border-b-2 pb-4">
          <div className="basis-1/3 flex items-end">
            <NavLink
              to="/luxury-pens-e-commerce/Store"
              className="group inline-flex text-lg font-medium h-full items-end xs:items-center relative hover:before:w-12 xs:hover:before:w-28 sm:hover:before:w-48 before:content-[' '] before:absolute before:bottom-[calc(50%-6px)] xs:before:bottom-[calc(50%-2px)] before:left-[5px] before:w-0 before:border-b-4 before:border-b-secondary-800 before:transition-all before:duration-200"
            >
              <Icon type="return" className="h-7 w-auto mr-2 select-none" />
              <span className="hidden xs:inline relative bottom-[1px] transition-opacity duration-200 group-hover:opacity-20">
                Continue shopping
              </span>
            </NavLink>
          </div>
          <h1 className="flex justify-center items-center font-bold text-3xl basis-1/3">
            Basket
          </h1>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <div>
          <h2 className="text-primary-500 font-bold text-2xl mt-4 px-6 md:mx-8 lg:max-w-5xl lg:mx-auto">
            Your basket is empty
          </h2>
        </div>
      ) : (
        <>
          <ul className="px-6 md:mx-8 lg:max-w-5xl lg:mx-auto mb-10">
            {cartItems.map((item) => (
              <BasketItem
                className=" pb-4 my-4 border-b"
                key={item.id}
                {...item}
              />
            ))}
          </ul>
          <div className="flex flex-col mb-8 lg:flex-row lg:justify-between lg:w-[1024px] lg:mx-auto lg:px-8 lg:my-14">
            <div className="NOTE px-6 mb-10 md:px-8 lg:px-0 lg:flex-row lg:w-100 lg:m-0">
              <p className="text-red-500 text-justify">
                Please, check carefully your order and your contact information
                before clicking on the "Order" button. No alteration will be
                accepted afterward.
              </p>
            </div>
            <div className="ORDER-SUMMARY w-full overflow-hidden bg-primary-200 ml-auto mr-6 max-w-md md:mr-8 shadow-lg sm:rounded-md lg:mr-0">
              <div className="px-6 lg:max-w-5xl lg:mx-auto py-8">
                <h3 className="text-lg font-bold mb-4">Order summary</h3>
                <div className="flex justify-between">
                  <span className="text-sm">Total item cost:</span>
                  <span className="font-bold">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping charge:</span>
                  <span className="font-bold">{formatCurrency(0)}</span>
                </div>
              </div>
              <div className="px-6 lg:max-w-5xl lg:mx-auto py-5 bg-primary-600 text-white">
                <div className="flex justify-between mb-4">
                  <span className="">TOTAL AMOUNT:</span>
                  <span className="font-bold">{formatCurrency(total)}</span>
                </div>
                <button className="block mx-auto bg-white text-primary-600 rounded-full px-4 py-2 transition-all hover:font-bold hover:px-6">
                  Confirm my order
                </button>
              </div>
            </div>
          </div>
          <div className="px-6 md:px-8 pb-8 flex flex-col lg:flex-row lg:max-w-5xl lg:mx-auto lg:gap-8">
            <div className="mb-8 w-3/4 mx-auto text-center lg:text-left">
              <h4 className="mb-1 font-bold flex items-center justify-center  lg:justify-start">
                <Icon
                  type="airplane"
                  className="inline-block mr-1 h-5 w-auto select-none"
                />
                <span>DELIVERY</span>
              </h4>
              <p className="text-sm">
                Free delivery all across the globe. Possible return under 14
                days.
              </p>
            </div>
            <div className="mb-8 w-3/4 mx-auto text-center lg:text-left">
              <h4 className="mb-1 font-bold flex items-center justify-center  lg:justify-start">
                <Icon
                  type="shield"
                  className="inline-block mr-1 h-5 w-auto select-none"
                />
                <span>SECURE PAYMENT</span>
              </h4>
              <p className="text-sm">
                Visa, Mastercard, Post Finance, Paypal, Twint, WebMoney, CIPS,
                EasyPay, etc.
              </p>
            </div>
            <div className=" w-3/4 mx-auto text-center lg:text-left">
              <h4 className="mb-1 font-bold flex items-center justify-center  lg:justify-start">
                <img
                  src={customerServiceIcon}
                  alt=""
                  className="inline-block mr-1 h-5 w-auto select-none"
                />
                <span>CUSTOMER SERVICE</span>
              </h4>
              <p className="text-sm">
                Monday to Friday from 10am to 7pm and Saturday from 10am to 5pm.
              </p>
              <div className="my-2">+1 (213) 123-4567</div>
              <p>
                <small className="italic">
                  (Calls from USA : at local rate. Calls from abroad : at
                  telecom provider's international rate.)
                </small>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type BaksetItemProps = {
  id: number;
  className: string;
};

function BasketItem({ id, className }: BaksetItemProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { removeItem } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item === undefined) return null;

  return (
    <li
      className={
        'flex flex-col shadow-md p-4 rounded-md bg-primary-200' + className
      }
    >
      <button onClick={() => removeItem(id)} className="ml-auto mb-2">
        <Icon type="close" className="w-8 h-8 select-none" />
      </button>
      <div className="flex gap-6 flex-col sm:flex-row">
        <div className="shrink-0 bg-primary-300 w-full sm:w-5/12 md:max-w-md">
          <img
            src={item.paths.lowQuality[1]}
            alt={item.name}
            className="w-full object-cover h-[30vw] sm:h-[20vw] md:h-32 md:max-w-md"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 sm:gap-6 md:gap-0 md:my-4 md:justify-between md:items-center flex-grow">
          <div className="font-bold md:text-center">{item.name}</div>
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center justify-center font-bold bg-primary-400 rounded-full py-1.5 xs:text-lg sm:w-32 transition-colors hover:bg-primary-600 hover:text-secondary-200"
          >
            View
          </button>
        </div>
        <div className="hidden md:flex flex-col justify-center items-center gap-8 basis-36">
          <span className="font-bold">{formatCurrency(item.price)}</span>
          <ItemButtons id={item.id} className="" />
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between mt-6">
        <ItemButtons id={item.id} className="inline-flex" />
        <span className="font-medium text-lg">
          {formatCurrency(item.price)}
        </span>
      </div>
      {isPreviewOpen && (
        <StoreItemPreview closeMenu={() => setIsPreviewOpen(false)} {...item} />
      )}
    </li>
  );
}
