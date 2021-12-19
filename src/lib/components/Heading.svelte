<script lang="ts">
  export let title: string = "";
</script>

<h2 class="text-xl py-2 font-bold">
  {title}:
  <slot />
</h2>
