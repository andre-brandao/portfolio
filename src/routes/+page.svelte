<script lang="ts">
   import { formatDate } from '$lib/utils';
   import { goto } from '$app/navigation';
   import { title } from '$lib/config';
   export let data;
</script>

<svelte:head>
   <title>{title}</title>
</svelte:head>

<!-- Posts -->
<section>
   <ul class="posts">
      {#each data.posts as post}
         <button
            on:click={() => {
               goto(post.slug, {
                  noScroll: true,
               });
            }}
         >
            <a href={post.slug} />
            <li class="post">
               <p class="title">{post.title}</p>
               <p />
               <p class="date">{formatDate(post.date)}</p>
               <p class="description">{post.description}</p>
            </li>
         </button>
      {/each}
   </ul>
   <div class="coming-soon">
      <p class="title">Theres More</p>
      <p />
      <!-- <p class="date">{formatDate(post.date)}</p> -->
      <p class="description">
         I have other projects, but I did not write a post for it, most are in C or Java for college
         classes.
      </p>
      <div />
   </div>
</section>

<style>
   .coming-soon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding-top: var(--size-7);
      padding-bottom: var(--size-7);
   }

   /* a {
      text-decoration: none;
   } */
   .posts {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
      gap: 2rem;
   }

   /* .post {
      background-color: var(--surface-4);
      padding: var(--size-7);
      border-radius: var(--size-3);
      box-shadow: var(--shadow-4);

      min-block-size: 400px;
   } */
   /* when hover post it gets bigger*/
   /* .post:hover {
      background-color: var(--surface-1);
      transition: background-color 0.2s ease-in-out;
   } */
   button:hover {
      cursor: pointer;
      /* shadow color */
      /* background: linear-gradient(
         to bottom,
         #ff5733,
         #c9b7b4
      ); */
      box-shadow: 0 0 0 0.5em var(--brand);
   }

   .post:not(:last-child) {
      border-bottom: 1px solid var(--border);
      padding-bottom: var(--size-7);
   }

   .title {
      font-size: var(--font-size-fluid-2);
      text-transform: capitalize;
      color: var(--text-1);
   }

   .date {
      color: var(--text-2);
   }

   .description {
      margin-top: var(--size-3);
      color: var(--text-3);
   }
</style>
