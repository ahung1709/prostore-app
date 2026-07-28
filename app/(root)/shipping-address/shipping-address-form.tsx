'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { ShippingAddress } from '@/types';
import { shippingAddressSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useForm,
  SubmitHandler,
} from 'react-hook-form';
import { z } from 'zod';
import { shippingAddressDefaultValues } from '@/lib/constants';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader } from 'lucide-react';
import { updateUserAddress } from '@/lib/actions/user.actions';

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values,
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      router.push('/payment-method');
    });
  };

  return (
    <>
      <div className='max-w-md mx-auto space-y-4'>
        <h1 className='h2-bold mt-4'>Shipping Address</h1>
        <p className='text-sm text-muted-foreground'>
          Please enter and address to ship to
        </p>
        <form
          method='post'
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-col md:flex-row gap-5'>
            <FieldGroup>
              <Controller
                name='fullName'
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'fullName'
                  >;
                  fieldState: ControllerFieldState;
                }) => (
                  <Field data-invalid={fieldState.invalid} className='w-full'>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter full name'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <FieldGroup>
              <Controller
                name='streetAddress'
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'streetAddress'
                  >;
                  fieldState: ControllerFieldState;
                }) => (
                  <Field data-invalid={fieldState.invalid} className='w-full'>
                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter address'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <FieldGroup>
              <Controller
                name='city'
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'city'
                  >;
                  fieldState: ControllerFieldState;
                }) => (
                  <Field data-invalid={fieldState.invalid} className='w-full'>
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter city'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <FieldGroup>
              <Controller
                name='postalCode'
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'postalCode'
                  >;
                  fieldState: ControllerFieldState;
                }) => (
                  <Field data-invalid={fieldState.invalid} className='w-full'>
                    <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter postal code'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <FieldGroup>
              <Controller
                name='country'
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'country'
                  >;
                  fieldState: ControllerFieldState;
                }) => (
                  <Field data-invalid={fieldState.invalid} className='w-full'>
                    <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter country'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <div className='flex gap-2'>
            <Button
              type='submit'
              disabled={isPending}
              className='cursor-pointer'
            >
              {isPending ? (
                <Loader className='w-4 h-4 animate-spin' />
              ) : (
                <ArrowRight className='w-4 h-4' />
              )}{' '}
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingAddressForm;
