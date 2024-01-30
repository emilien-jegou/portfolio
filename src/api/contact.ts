import { z } from '@builder.io/qwik-city';
import type { ApiFunction } from '~/entry.cloudflare-pages';

const ContactFormSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1),
  category: z.string().min(1),
  metadata: z.optional(z.string()),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const run: ApiFunction = async (req, env, _ctx) => {
  // Parse and validate the form data
  const formData = await req.formData();
  const values = {
    email: formData.get('email'),
    message: formData.get('message'),
    category: formData.get('category'),
    metadata: formData.get('metadata') || undefined, // default value if not provided
  };

  const parsedData = ContactFormSchema.parse(values);

  await env.CLOUDFLARE_D1_DB.prepare(
    'INSERT INTO contact (email, message, createdAt, category, metadata) VALUES(?1, ?2, ?3, ?4, ?5)',
  )
    .bind(
      parsedData.email,
      parsedData.message,
      Number(new Date()),
      parsedData.category,
      parsedData.metadata ?? '{}',
    )

    .run();

  return new Response('Success');
};
