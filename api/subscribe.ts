import { notifyDiscord } from '../server/discord.js';
import { parseJsonBody } from '../server/validate.js';
import { subscribeSchema } from '../src/lib/forms.js';

export async function POST(request: Request) {
  const values = await parseJsonBody(request, subscribeSchema);
  if (values instanceof Response) return values;

  return notifyDiscord(`**New Email Address**\n\n**Email:** ${values.email}`);
}
