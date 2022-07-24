import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

export default function NavBar() {
  let { pathname } = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { openCart, cartItemsQuantity } = useShoppingCart();
  const toggleHamburger = () => setIsHamburgerOpen((isOpen) => !isOpen);

  return (
    <header className="flex z-10 justify-between sticky top-0 bg-slate-400">
      <div className={'MOBILE-MENU flex items-center p-2 h-12 md:hidden'}>
        <button
          className={'hamburger-menu-btn' + (isHamburgerOpen ? ' open' : '')}
          onClick={toggleHamburger}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul
          className={
            (!isHamburgerOpen ? '-translate-x-screen' : '') +
            ' absolute top-12 left-0 p-4 transition-transform flex flex-col gap-4 bg-slate-400 w-full'
          }
        >
          <li className="nav-li">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/Store">Store</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/About">About</NavLink>
          </li>
          {pathname === '/Basket' || cartItemsQuantity === 0 ? null : (
            <li className="nav-li">
              <NavLink to="/Basket">Checkout</NavLink>
            </li>
          )}
        </ul>
      </div>
      <ul className="DESKTOP-MENU hidden md:flex">
        <li className="nav-li">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/Store">Store</NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/About">About</NavLink>
        </li>
        {pathname === '/Basket' || cartItemsQuantity === 0 ? null : (
          <li className="nav-li">
            <NavLink to="/Basket">Checkout</NavLink>
          </li>
        )}
      </ul>
      {pathname === '/Basket' ? null : (
        <button onClick={openCart} className="rounded-full">
          Cart
          {cartItemsQuantity === 0 ? null : (
            <div className="rounded-full">{cartItemsQuantity}</div>
          )}
        </button>
      )}
    </header>
  );
}