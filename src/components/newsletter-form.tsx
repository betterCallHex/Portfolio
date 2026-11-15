import { ArrowRight, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useFormSubmission } from '@/hooks/use-form-submission';
import { subscribeSchema } from '@/lib/forms';

export function NewsletterForm() {
  const [state, formAction, isPending] = useFormSubmission({
    schema: subscribeSchema,
    endpoint: '/api/subscribe',
    successMessage: 'You’re on the list. Thanks for subscribing!',
  });
  const emailError = state.errors.email?.[0];

  return (
    <form action={formAction} noValidate className='mt-5'>
      <Field data-invalid={Boolean(emailError)}>
        <FieldLabel htmlFor='newsletter-email' className='sr-only'>
          Email address
        </FieldLabel>
        <div className='flex gap-2'>
          <Input
            id='newsletter-email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder='you@example.com'
            defaultValue={state.values.email}
            aria-invalid={Boolean(emailError)}
            className='h-10 rounded-full px-4'
          />
          <Button
            type='submit'
            disabled={isPending}
            className='h-10 rounded-full px-4'
          >
            {isPending ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              <ArrowRight />
            )}
            Subscribe
          </Button>
        </div>
        {emailError && <FieldError>{emailError}</FieldError>}
      </Field>
    </form>
  );
}
