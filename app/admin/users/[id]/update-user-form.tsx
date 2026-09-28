'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { USER_ROLES } from '@/lib/constants';
import { updateUserSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit = () => {
    return;
  };

  return (
    <form method='POST' onSubmit={form.handleSubmit(onSubmit)}>
      {/* Email */}
      <div>
        <Controller
          control={form.control}
          name='email'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof updateUserSchema>,
              'email'
            >;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                disabled={true}
                {...field}
                id={field.name}
                placeholder='Enter user email'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      {/* Name */}
      <div>
        <Controller
          control={form.control}
          name='name'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof updateUserSchema>,
              'name'
            >;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder='Enter user name'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      {/* Role */}
      <div>
        <Controller
          control={form.control}
          name='role'
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof updateUserSchema>,
              'role'
            >;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid} className='w-full'>
              <FieldLabel htmlFor={field.name}>Role</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className='flex-between mt-4'>
        <Button
          type='submit'
          className='w-full'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Update User'}
        </Button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
