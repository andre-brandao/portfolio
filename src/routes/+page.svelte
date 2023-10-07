<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<!-- Posts -->
<section>
	<ul class="posts">
		{#each data.posts as post}
			<a href={post.slug}>
				<li class="post">
					<p class="title">{post.title}<p/>
					<p class="date">{formatDate(post.date)}</p>
					<p class="description">{post.description}</p>
				</li>
			</a>
		{/each}
		<li class="coming-soon">
			<p class="title">Theres More<p/>
			<!-- <p class="date">{formatDate(post.date)}</p> -->
			<p class="description">I have other projects, but I did not write a post for it, most are in C or Java for college classes.</p>
		</li>
		
	</ul>
</section>

<style>
	.coming-soon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	a {
		text-decoration: none;
	}
	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
		gap: 2rem;
	}
	
	.post {
		/* max-inline-size: var(--size-content-2); */
		background-color: var(--surface-4);
		padding: var(--size-7);
		border-radius: var(--size-3);
		box-shadow: var(--shadow-4);

		/* give it a min height */
		min-block-size: 400px;

	}
	/* when hover post it gets bigger*/
	.post:hover {
		background-color: var(--surface-1);
		transition: background-color 0.2s ease-in-out;


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
