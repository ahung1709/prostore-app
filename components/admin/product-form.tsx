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
} from 'react-hook-form';
import { z } from 'zod';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Field, FieldError, FieldLabel } from '../ui/field';

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

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  });

  return (
    <form className='space-y-8'>
      <div className='flex flex-col md:flex-row gap-5'>
        {/* Name */}
        <Controller
          control={form.control}
          name='name'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              'name'
            >;
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
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              'slug'
            >;
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
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              'category'
            >;
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
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              'brand'
            >;
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
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              'price'
            >;
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
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              'stock'
            >;
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
      </div>
      <div className='upload-field'>{/* isFeatured */}</div>
      <div>
        {/* Description */}
        <Controller
          control={form.control}
          name='description'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              'description'
            >;
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
