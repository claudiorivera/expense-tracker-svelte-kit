<script lang="ts">
	import { formatCurrency } from "$lib/format-currency";
	import type { HydratedDocument } from "mongoose";
	import { fade } from "svelte/transition";

	import type { Transaction } from "$lib/types";
	import DeleteIcon from "./delete-icon.svelte";

	export let transactions: HydratedDocument<Transaction>[];
	export let fetchTransactions: () => Promise<void>;

	const handleDelete = async (_id: string) => {
		await fetch(`/api/transactions/${_id}`, {
			method: "DELETE",
		});
		fetchTransactions();
	};
</script>

<ul class="m-1 rounded bg-white p-1 shadow">
	{#each transactions as transaction (transaction._id.toString())}
		<li class="border-b p-3 last:border-none hover:font-bold" transition:fade>
			<div class="flex items-center">
				<button
					class="mr-1"
					type="button"
					on:click={() => {
						handleDelete(transaction._id.toString());
					}}
				>
					<DeleteIcon />
				</button>
				<div class="flex-grow">{transaction.description}</div>
				<div>{formatCurrency(transaction.amount)}</div>
			</div>
		</li>
	{/each}
</ul>
