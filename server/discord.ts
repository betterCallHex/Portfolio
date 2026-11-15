export async function notifyDiscord(content: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      { error: 'Messaging is not configured on this server.' },
      { status: 503 },
    );
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
  }).catch(() => null);

  if (!response?.ok) {
    return Response.json(
      { error: 'The message could not be delivered.' },
      { status: 502 },
    );
  }

  return new Response(null, { status: 204 });
}
