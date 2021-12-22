<script lang="ts">
  export let title = "";
</script>

<h2 class="text-xl py-2 font-bold">
  {title}:
  <slot name="inline-content" />
</h2>
