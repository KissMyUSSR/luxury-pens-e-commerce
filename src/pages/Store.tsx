import storeItems from '../data/items';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import ItemButtons from '../components/ItemButtons';
import StoreItemPreview from '../components/StoreItemPreview';
import { useState } from 'react';

export default function Store() {
  return (
    <div className="px-6 max-w-5xl mx-auto md:px-8">
      <h1 className="text-center text-3xl font-bold mt-4 mb-6">Store</h1>
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {storeItems.map((item) => (
          <StoreItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  desc: string;
  paths: string[];
};

function StoreItem({ id, name, price, desc, paths }: StoreItemProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const openPreview = () => setIsPreviewOpen(true);
  const closePreview = () => setIsPreviewOpen(false);
  const { getItemQuantity } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <li className="bg-white rounded-md shadow-md h-80">
      <img
        src={paths[0]}
        alt={name}
        className="rounded-t-md bg-slate-200 h-48 w-full object-cover transition-all duration-300 hover:bg-slate-300 cursor-pointer"
        onClick={openPreview}
      />
      <div className="p-2 flex flex-col h-32">
        <div className="flex justify-between">
          <h4 onClick={openPreview} className="cursor-pointer font-bold mr-4">
            {name}
          </h4>
          <span
            onClick={openPreview}
            className="flex justify-center items-center cursor-pointer"
          >
            {formatCurrency(price)}
          </span>
        </div>
        <div className="mt-auto">
          {quantity === 0 ? (
            <ItemButtons id={id} type="add" className="w-full" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ItemButtons id={id} />
              <ItemButtons id={id} type="remove" />
            </div>
          )}
        </div>
      </div>{' '}
      {isPreviewOpen && (
        <StoreItemPreview
          id={id}
          name={name}
          price={price}
          paths={paths}
          desc={desc}
          closeMenu={closePreview}
        />
      )}
    </li>
  );
}
