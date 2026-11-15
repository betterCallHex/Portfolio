import { LoaderCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormSubmission } from '@/hooks/use-form-submission';
import { contactSchema } from '@/lib/forms';

export function ContactForm() {
  const [state, formAction, isPending] = useFormSubmission({
    schema: contactSchema,
    endpoint: '/api/contact',
    successMessage: 'Message sent. I’ll get back to you soon!',
  });
  const { errors, values } = state;

  return (
    <form action={formAction} noValidate>
      <FieldGroup className='gap-6'>
        <div className='grid gap-6 sm:grid-cols-2'>
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor='contact-name'>Name</FieldLabel>
            <Input
              id='contact-name'
              name='name'
              autoComplete='name'
              placeholder='Jane Doe'
              defaultValue={values.name}
              aria-invalid={Boolean(errors.name)}
              className='h-11'
            />
            {errors.name && <FieldError>{errors.name[0]}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor='contact-email'>Email</FieldLabel>
            <Input
              id='contact-email'
              name='email'
              type='email'
              autoComplete='email'
              placeholder='jane@company.com'
              defaultValue={values.email}
              aria-invalid={Boolean(errors.email)}
              className='h-11'
            />
            {errors.email && <FieldError>{errors.email[0]}</FieldError>}
          </Field>
        </div>

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor='contact-message'>Message</FieldLabel>
          <Textarea
            id='contact-message'
            name='message'
            rows={6}
            placeholder='Tell me about your project…'
            defaultValue={values.message}
            aria-invalid={Boolean(errors.message)}
            className='min-h-40 resize-y'
          />
          {errors.message && <FieldError>{errors.message[0]}</FieldError>}
        </Field>

        <Button
          type='submit'
          size='lg'
          disabled={isPending}
          className='bg-brand text-brand-foreground hover:bg-brand/85 h-11 w-full rounded-full px-5 sm:w-fit sm:self-end'
        >
          {isPending ? <LoaderCircle className='animate-spin' /> : <Send />}
          {isPending ? 'Sending…' : 'Send message'}
        </Button>
      </FieldGroup>
    </form>
  );
}
