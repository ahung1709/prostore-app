'use client';

import { toast } from 'sonner';
import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  ControllerRenderProps,
  Controller,
  useForm,
  ControllerFieldState,
  SubmitHandler,
} from 'react-hook-form';
import { z } from 'zod';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { UploadButton } from '@/lib/uploadthing';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';

type ProductFormInput = z.input<typeof insertProductSchema>;
type ProductFormOutput = z.output<typeof insertProductSchema>;

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  const form = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(insertProductSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<ProductFormOutput> = async (values) => {
    // On Create
    if (type === 'Create') {
      const res = await createProduct(values);

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.push('/admin/products');
      }
    }

    // On Update
    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products');
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.push('/admin/products');
      }
    }
  };

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <form
      method='POST'
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-8'
    >
      <div className='flex flex-col md:flex-row gap-5'>
        {/* Name */}
        <Controller
          control={form.control}
          name='name'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<ProductFormInput, 'name'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder='Enter product name'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Slug */}
        <Controller
          control={form.control}
          name='slug'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<ProductFormInput, 'slug'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
              <div className='relative'>
                <Input
                  {...field}
                  id={field.name}
                  placeholder='Enter slug'
                  aria-invalid={fieldState.invalid}
                />
                <Button
                  type='button'
                  className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
                  onClick={() =>
                    form.setValue(
                      'slug',
                      slugify(form.getValues('name'), { lower: true }),
                    )
                  }
                >
                  Generate
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className='flex flex-col md:flex-row gap-5'>
        {/* Category */}
        <Controller
          control={form.control}
          name='category'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<ProductFormInput, 'category'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Category</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder='Enter category'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Brand */}
        <Controller
          control={form.control}
          name='brand'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<ProductFormInput, 'brand'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Brand</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder='Enter brand'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className='flex flex-col md:flex-row gap-5'>
        {/* Price */}
        <Controller
          control={form.control}
          name='price'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<ProductFormInput, 'price'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Price</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder='Enter product price'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Stock */}
        <Controller
          control={form.control}
          name='stock'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<ProductFormInput, 'stock'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type='number'
                placeholder='Enter stock'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className='upload-field flex flex-col md:flex-row gap-5'>
        {/* Images */}
        <Controller
          control={form.control}
          name='images'
          render={({ fieldState }: { fieldState: ControllerFieldState }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel>Images</FieldLabel>
              <Card>
                <CardContent className='space-y-2 mt-2 min-h-48'>
                  <div className='flex-start space-x-2'>
                    {images.map((image: string) => (
                      <Image
                        key={image}
                        src={image}
                        alt='Product image'
                        className='w-20 h-20 object-cover object-center rounded-sm'
                        width={100}
                        height={100}
                      />
                    ))}
                    <UploadButton
                      endpoint='imageUploader'
                      onClientUploadComplete={(res: { ufsUrl: string }[]) => {
                        form.setValue('images', [...images, res[0].ufsUrl], {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className='upload-field'>
        {/* isFeatured */}
        Featured Product
        <Card>
          <CardContent className='space-y-2 mt-2'>
            <Controller
              control={form.control}
              name='isFeatured'
              render={({
                field,
                fieldState,
              }: {
                field: ControllerRenderProps<ProductFormInput, 'isFeatured'>;
                fieldState: ControllerFieldState;
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel htmlFor={field.name}>Is Featured?</FieldLabel>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {isFeatured && banner && (
              <Image
                src={banner}
                alt='Banner image'
                className='w-full object-cover object-center rounded-sm'
                width={1920}
                height={680}
              />
            )}
            {isFeatured && !banner && (
              <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={(res: { ufsUrl: string }[]) => {
                  form.setValue('banner', res[0].ufsUrl, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                onUploadError={(error: Error) => {
                  toast.error(`ERROR! ${error.message}`);
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        {/* Description */}
        <Controller
          control={form.control}
          name='description'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<ProductFormInput, 'description'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder='Enter product description'
                className='resize-none'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div>
        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='button col-span-2 w-full'
        >
          {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
