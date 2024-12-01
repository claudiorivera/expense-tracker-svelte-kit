<script lang="ts">
import "../app.pcss";

let { children } = $props();
</script>

<main class="cursor-default bg-slate-50 font-thin antialiased">
	{@render children()}
</main>
