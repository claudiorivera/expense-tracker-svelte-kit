<script lang="ts">
import "../app.pcss";
interface Props {
	children?: import("svelte").Snippet;
}

let { children }: Props = $props();
</script>

<main class="cursor-default bg-slate-50 font-thin antialiased">
	{@render children?.()}
</main>
