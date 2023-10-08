---
title: This Page
description: How was this page made.
date: '2023-4-14'
categories:
  - SvelteKit
  - Markdown
published: true
---

<script>
import  SelectTheme from '$lib/components/select_theme.svelte';
</script>

## Table of Contents

## Description

This page was made using [SvelteKit](https://kit.svelte.dev/), [Svelte](https://svelte.dev/), [Markdown](https://www.markdownguide.org/), and [Github Pages](https://pages.github.com/).

## Theming

<label for="theme-select">Select a theme:</label>
<SelectTheme id="theme-select"/>

I have this setup as the default theme and multiple custom themes.

app.css

```css
:root {
 color-scheme: dark;

 --brand: var(--brand-dark);
 --text-1: var(--text-1-dark);
 --text-2: var(--text-2-dark);
 --surface-1: var(--surface-1-dark);
 --surface-2: var(--surface-2-dark);
 --surface-3: var(--surface-3-dark);
 --surface-4: var(--surface-4-dark);
 --background: var(--background-dark);
 --border: var(--border-dark);
}

```

C1 theme

```css

[color-scheme='custom-1'] {
 color-scheme: custom-1;
  
 --brand: #FF5733;
 --text-1: #333333;
 --text-2: #666666;
 --surface-1: #FFFFFF;
 --surface-2: #F0F0F0;
 --surface-3: #CCCCCC;
 --surface-4: #EFEFEF;
 --background: #F5F5F5;
 --border: #DDDDDD;
}
```

We can toggle the theme on the button on the top right corner or set a custom theme on the select at the start of the theme post.

theme.ts

```ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'custom-1' | 'custom-2' | 'custom-3' | 'custom-4';

const userTheme = browser && localStorage.getItem('color-scheme');

// create the store
export const theme = writable(userTheme ?? 'dark');

export function toggleTheme() {
 theme.update((currentTheme) => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('color-scheme', newTheme);
  localStorage.setItem('color-scheme', newTheme);

  return newTheme;
 });
}

export function setTheme(newTheme: Theme) {
 theme.set(newTheme);
}

export function setCustomTheme(newTheme: Theme) {
 theme.update(() => {
  document.documentElement.setAttribute('color-scheme', newTheme);
  localStorage.setItem('color-scheme', newTheme);

  return newTheme;
 });
}
```

## Markdown Support

I added mdsvex and some plugins as a preprocessor to render markdown files as html.

svelte.config.js

```js
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
 extensions: ['.md'],
 layout: {
  _: './src/mdsvex.svelte'
 },
 highlight: {
  highlighter: async (code, lang = 'text') => {
   const highlighter = await shiki.getHighlighter({ theme: 'dracula' })
   const html = escapeSvelte(highlighter.codeToHtml(code, { lang }))
   return `{@html \`${html}\` }`
  }
 },
 remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
 rehypePlugins: [rehypeSlug],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
 extensions: ['.svelte', '.md'],
 preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
 kit: {
  adapter: adapter()
 }
}

export default config

```

This also allows to use svelte components inside markdown files as we would normally.

```html
<script>
  import  SelectTheme from '$lib/components/select_theme.svelte';
</script>

<SelectTheme/>

```
