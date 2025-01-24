<script lang="ts">
import { cn } from "$lib/utils";
import { Select as SelectPrimitive } from "bits-ui";
import { ChevronsUpDown } from "lucide-svelte";

type $$Props = SelectPrimitive.TriggerProps;
type $$Events = SelectPrimitive.TriggerEvents;

let className: $$Props["class"] = undefined;
export { className as class };
</script>

<SelectPrimitive.Trigger
  class={cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    className,
  )}
  {...$$restProps}
>
  <slot />
  <div>
    <ChevronsUpDown class="h-4 w-4 opacity-50" />
  </div>
</SelectPrimitive.Trigger>
