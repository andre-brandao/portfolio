type Day = {
	count: number
	day: number
	level: number
	month: string
	name: string
	year: number
}

export type Contributions = Array<Day | null>



export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	categories: Categories[]
	published: boolean
}
