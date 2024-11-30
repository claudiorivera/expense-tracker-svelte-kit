<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
export let title = "";
</script>

<h2 class="py-2 text-xl font-bold">
	{title}:
	<slot name="inline-content" />
</h2>
