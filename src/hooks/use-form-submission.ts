import { useActionState } from 'react';
import { toast } from 'sonner';
import { type ZodType, z } from 'zod';

type FormState = {
  errors: Partial<Record<string, string[]>>;
  values: Record<string, string>;
};

const INITIAL_STATE: FormState = { errors: {}, values: {} };
const FALLBACK_ERROR = 'Something went wrong. Please try again.';

export function useFormSubmission<Values>({
  schema,
  endpoint,
  successMessage,
}: {
  schema: ZodType<Values>;
  endpoint: string;
  successMessage: string;
}) {
  return useActionState(
    async (_previous: FormState, formData: FormData): Promise<FormState> => {
      const values = Object.fromEntries(
        [...formData].map(([key, value]) => [key, String(value)]),
      );
      const result = schema.safeParse(values);

      if (!result.success) {
        return { errors: z.flattenError(result.error).fieldErrors, values };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      }).catch(() => null);

      if (!response?.ok) {
        toast.error(await readErrorMessage(response));
        return { errors: {}, values };
      }

      toast.success(successMessage);
      return INITIAL_STATE;
    },
    INITIAL_STATE,
  );
}

async function readErrorMessage(response: Response | null) {
  if (!response) return FALLBACK_ERROR;

  const body: unknown = await response.json().catch(() => null);
  const parsed = z.object({ error: z.string() }).safeParse(body);

  return parsed.success ? parsed.data.error : FALLBACK_ERROR;
}
