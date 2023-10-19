<script lang="ts">
   import { supabase } from '$lib/supabase';
   import { z } from 'zod';
   import type { PageData } from './$types';
   import { superForm } from 'sveltekit-superforms/client';

   export let data: PageData;
   // export const prerender = false;

   let { form, errors, constraints, enhance} = superForm(data.form);
</script>

<main>
   <form method="post">
      <div>
         <label for="email">Email:</label>
         <input
            id="email"
            name="email"
            type="text"
            aria-invalid={$errors.email ? 'true' : undefined}
            bind:value={$form.email}
            {...$constraints.email}
         />
      </div>
      {#if $errors.email}
         <span class="invalid">{$errors.email}</span>
      {/if}

      <div>
         <label for="subject">Subject:</label>
         <input
            id="subject"
            name="subject"
            type="text"
            aria-invalid={$errors.subject ? 'true' : undefined}
            bind:value={$form.subject}
            {...$constraints.subject}
         />
      </div>
      {#if $errors.subject}
         <span class="invalid">{$errors.subject}</span>
      {/if}
      <div>
         <label for="message">Message:</label>
         <textarea
            name="message"
            id="message"
            aria-invalid={$errors.message ? 'true' : undefined}
            bind:value={$form.message}
            {...$constraints.message}
            rows="10"
         />
      </div>
      <button>Send Message</button>
   </form>
</main>

<style>
   form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }

   div {
      display: flex;
      flex-direction: column;

      margin-bottom: 1rem;
      width: 80%;
   }

   label {
      margin-bottom: 0.5rem;
      font-weight: bold;
   }

   input,
   textarea {
      padding: 0.5rem;
      border: 1px solid var(--brand);
      border-radius: 4px;
   }

   textarea {
      resize: none;
   }

   input:focus,
   textarea:focus {
      outline: none;
      border-color: var(--brand);
   }

   button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--brand);
      border-radius: 4px;
      background-color: var(--brand);
      color: var(--text-1);
      font-weight: bold;
      cursor: pointer;
      margin-bottom: 40px;

      /* font-weight: bold; */

      /* transition: all 0.2s ease-in-out; */
   }
   /* center message */

   .invalid {
      color: red;
   }
</style>
