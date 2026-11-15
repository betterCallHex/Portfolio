import { type ZodType, z } from 'zod';

export async function parseJsonBody<Values>(
  request: Request,
  schema: ZodType<Values>,
): Promise<Values | Response> {
  const body: unknown = await request.json().catch(() => null);
  const result = schema.safeParse(body);

  if (result.success) return result.data;

  return Response.json(
    { errors: z.flattenError(result.error).fieldErrors },
    { status: 422 },
  );
}
