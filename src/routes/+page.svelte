<script lang="ts">
	import AddTransaction from "$lib/components/AddTransaction.svelte";
	import Heading from "$lib/components/Heading.svelte";
	import IncomeExpenseSummary from "$lib/components/IncomeExpenseSummary.svelte";
	import TransactionsList from "$lib/components/TransactionsList.svelte";
	import { formatCurrency } from "$lib/formatDollarAmount";
	import type { Transaction } from "$lib/types";
	import type { HydratedDocument } from "mongoose";
	import type { PageData } from "./$types";

	export let data: PageData;

	let { transactions }: { transactions: HydratedDocument<Transaction>[] } =
		data;
	$: ({ transactions } = data);

	const fetchTransactions = async () => {
		const res = await fetch("/api/transactions");
		transactions = await res.json();
	};

	$: balance = transactions.reduce((acc, curr) => {
		return (acc += curr.amount);
	}, 0);
</script>

<svelte:head>
	<title>Expense Tracker</title>
</svelte:head>

<div class="mx-auto max-w-xs py-10 md:max-w-lg">
	<h1 class="py-3 text-3xl font-bold">Expense Tracker</h1>

	<Heading title="Balance">
		<span
			slot="inline-content"
			class={balance < 0 ? "text-red-500" : "text-green-500"}
			>{formatCurrency(balance)}</span
		>
	</Heading>
	<IncomeExpenseSummary {transactions} />

	<Heading title="Transactions" />
	<TransactionsList {transactions} {fetchTransactions} />

	<Heading title="Add Transaction" />
	<AddTransaction form={data.form} />
</div>
