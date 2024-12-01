<script lang="ts">
import { enhance } from "$app/forms";
import { formatCurrency } from "$lib/format-currency";
import type { Transaction } from "$lib/types";
import { fade } from "svelte/transition";
import { z } from "zod";
import DeleteIcon from "./delete-icon.svelte";

type Props = {
	transactions: (Transaction & { _id: string })[];
};

let { transactions }: Props = $props();
</script>

<ul class="m-1 rounded bg-white p-1 shadow">
	{#each transactions as transaction}
		{@render transactionDetails(transaction)}
	{/each}
</ul>

{#snippet transactionDetails(transaction: (Transaction & { _id: string }))}
	<li class="border-b p-3 last:border-none hover:font-bold" transition:fade>
		<div class="flex items-center">
			<form method="POST" action="?/delete" use:enhance={({ formData }) => {
        const transactionId = z.string().parse(formData.get('transactionId'));
        
        return async ({ result }) => {
            if (result.type === 'success') {
                transactions = transactions.filter(t => t._id !== transactionId);
            }
        };
    }}>
				<input type="hidden" name="transactionId" value={transaction._id} />
				<button
					class="mr-1"
					type="submit"
				>
					<DeleteIcon />
				</button>
			</form>
			<div class="flex-grow">{transaction.description}</div>
			<div>{formatCurrency(transaction.amount)}</div>
		</div>
	</li>
{/snippet}