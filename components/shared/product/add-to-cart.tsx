'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus } from 'lucide-react';
import { Cart, CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    // Handle success add to cart
    toast(
      <div className='flex items-center justify-between gap-2'>
        <span className='text-sm'>{res.message}</span>
        <Button
          size='sm'
          className='cursor-pointer'
          onClick={() => router.push('/cart')}
        >
          Go To Cart
        </Button>
      </div>,
    );
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast(
      <div className='flex items-center justify-between gap-2'>
        <span className='text-sm'>{res.message}</span>
      </div>,
    );

    return;
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
        <Minus className='h-4 w-4' />
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button type='button' variant='outline' onClick={handleAddToCart}>
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  ) : (
    <Button
      className='w-full cursor-pointer'
      type='button'
      onClick={handleAddToCart}
    >
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
