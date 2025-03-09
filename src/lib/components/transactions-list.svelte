<script lang="ts">
import { enhance } from "$app/forms";
import Button from "$lib/components/ui/button/button.svelte";
import { formatCurrency } from "$lib/format-currency";
import type { Transaction } from "$lib/types";
import { Trash2Icon } from "lucide-svelte";
import { fade } from "svelte/transition";

export let transactions: Array<Transaction>;
</script>

<ul class="m-1 rounded bg-white p-1 shadow-sm">
  {#each transactions as transaction (transaction._id)}
  <li class="border-b p-3 last:border-hidden hover:font-normal" transition:fade>
    <form method="POST" action="?/delete" use:enhance class="inline">
      <div class="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          formaction="?/delete"
          name="id"
          value={transaction._id}
          class="hover:bg-red-100 cursor-pointer"
          type="submit"
        >
          <Trash2Icon class="text-red-500" />
        </Button>
        <div class="grow">{transaction.description}</div>
        <div>{formatCurrency(transaction.amount)}</div>
      </div>
    </form>
  </li>
  {/each}
</ul>

