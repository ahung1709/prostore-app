'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.actions';

const AddToCart = ({ item }: { item: CartItem }) => {
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
        <span className='text-sm'>{item.name} added to cart</span>
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

  return (
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
