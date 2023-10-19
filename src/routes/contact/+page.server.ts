import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const prerender = false;

const schema = z.object({
   email: z.string().email(),
   subject: z.string().min(2),
   message: z.string().min(5),
});

export const load = (async () => {
   const form = await superValidate(schema);

   return { form };
}) satisfies PageServerLoad;

export const actions = {
   default: async ({ request }) => {
      const form = await superValidate(request, schema);
      console.log('FORM', form);

      // Convenient validation check:
      if (!form.valid) {
         // Again, return { form } and things will just work.
         return fail(400, { form });
      }

      // TODO: Do something with the validated form.data
      try {
         const result = supabase.from('Received Messages').insert(form.data);
         console.log('inserted into database');
         console.log((await result).error);
      } catch (error) {
         setError(form, 'email', 'Error saving message on db');
         return fail(400, { form });
      }

      throw redirect(302, '/contact/thankyou');

      // Yep, return { form } here too
      return { form };
   },
};
