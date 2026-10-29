'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { reviewFormDefaultValues } from '@/lib/constants';
import { insertReviewSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createUpdateReview } from '@/lib/actions/review.actions';

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string;
  productId: string;
  onReviewSubmitted: () => void;
}) => {
  const [open, setOpen] = useState(false);

  type ReviewFormInput = z.input<typeof insertReviewSchema>;
  type ReviewFormOutput = z.output<typeof insertReviewSchema>;

  const form = useForm<ReviewFormInput, unknown, ReviewFormOutput>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  });

  // Open Form Handler
  const handleOpenForm = () => {
    form.setValue('productId', productId);
    form.setValue('userId', userId);

    setOpen(true);
  };

  // Submit Form Handler
  const onSubmit: SubmitHandler<ReviewFormOutput> = async (values) => {
    const res = await createUpdateReview({ ...values, productId });
    console.log(res);

    if (!res) {
      toast.error('Unable to submit review');
      return;
    }

    if (!res.success) {
      toast.error(res.message);
    }

    setOpen(false);

    onReviewSubmitted();

    toast.success(res.message);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={handleOpenForm}
        variant='default'
        className='cursor-pointer'
      >
        Write a Review
      </Button>
      <DialogContent className='sm:max-w-[425px]'>
        <form method='post' onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your thoughts with other customers
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <Controller
              control={form.control}
              name='title'
              render={({
                field,
                fieldState,
              }: {
                field: ControllerRenderProps<ReviewFormInput, 'title'>;
                fieldState: ControllerFieldState;
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder='Enter title'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='description'
              render={({
                field,
                fieldState,
              }: {
                field: ControllerRenderProps<ReviewFormInput, 'description'>;
                fieldState: ControllerFieldState;
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder='Enter description'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='rating'
              render={({
                field,
                fieldState,
              }: {
                field: ControllerRenderProps<ReviewFormInput, 'rating'>;
                fieldState: ControllerFieldState;
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Rating</FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={Number(field.value).toString()}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          {index + 1} <StarIcon className='inline h-4 w-4' />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type='submit'
              size='lg'
              className='w-full cursor-pointer'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
