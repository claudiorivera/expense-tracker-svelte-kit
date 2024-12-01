<script lang="ts">
import { formatCurrency } from "$lib/format-currency";
import type { Transaction } from "$lib/types";

type Props = {
	transactions: (Transaction & { _id: string })[];
};

let { transactions }: Props = $props();

let totalIncome = $derived(
	transactions
		.filter((transaction) => transaction.amount > 0)
		.reduce((acc, curr) => {
			return acc + curr.amount;
		}, 0),
);

let totalExpenses = $derived(
	transactions
		.filter((transaction) => transaction.amount <= 0)
		.reduce((acc, curr) => {
			return acc + curr.amount;
		}, 0),
);
</script>

<div class="m-1 rounded bg-white p-1 shadow">
	<div class="flex justify-between">
		<div class="flex-grow border-r text-center">
			<div>INCOME</div>
			<div class="text-green-500">{formatCurrency(totalIncome)}</div>
		</div>
		<div class="flex-grow text-center">
			<div>EXPENSES</div>
			<div class="text-red-500">{formatCurrency(totalExpenses)}</div>
		</div>
	</div>
</div>
