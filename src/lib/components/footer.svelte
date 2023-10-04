<script>
	import * as config from '$lib/config';
	import { Github, Linkedin } from 'lucide-svelte';
</script>

<footer>
    <p>{config.title} &copy {new Date().getFullYear()}</p>

    <div>

        <a href="https://github.com/andre-brandao" target="_blank">
            <Github/>
        </a>
        
        <a href="https://www.linkedin.com/in/andr%C3%A9-brand%C3%A3o-719684239/" target="_blank">
            <Linkedin />
        </a>
    </div>
</footer>



<style>
    footer{
        padding-block: var(--size-7);
        border-top: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
    }

    p{
        color: var(--text-2);
    }

    div{
        display: flex;
        gap: 15px;
    }

    a{
        text-decoration: none;
        color: var(--text-2);
    }
</style>