import { notifyDiscord } from '../server/discord.js';
import { parseJsonBody } from '../server/validate.js';
import { contactSchema } from '../src/lib/forms.js';

export async function POST(request: Request) {
  const values = await parseJsonBody(request, contactSchema);
  if (values instanceof Response) return values;

  return notifyDiscord(
    `**New Contact Form Submission**\n\n**Name:** ${values.name}\n**Email:** ${values.email}\n**Message:**\n${values.message}`,
  );
}
